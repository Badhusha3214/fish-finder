const express = require("express");
const router = express.Router();

const Item = require("../../models/items");
const User = require("../../models/users");
const verifyToken = require("../../middleware/authentication");

const multer = require("multer");
const sharp = require("sharp");
const upload = multer({ storage: multer.memoryStorage() });
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");



// Create S3 client
const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
});


// Compress image to reduce size
const compressImage = async (buffer, maxSizeKB) => {
    let quality = 100;
    let imageBuffer;
    let sizeKB;

    do {
        imageBuffer = await sharp(buffer).resize({ width: 800 }).jpeg({ quality: quality }).toBuffer();
        sizeKB = imageBuffer.length / 1024;
        quality -= 10;
    } while (sizeKB > maxSizeKB && quality > 10);

    return imageBuffer;
};


// Handle files for each field
const handleFiles = async (fieldName, req, uploadPromises, fileUrls) => {
    if (req.files[fieldName]) {
        for (const file of req.files[fieldName]) {
            
            let buffer = file.buffer;
            if (file.mimetype.startsWith("image/")) {
                buffer = await compressImage(buffer, 500);
            }
            
            const fileName = `${Date.now()}_${file.originalname}`;
            const key = `${fieldName}/${fileName}`;

            const params = {
                Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);
            uploadPromises.push(s3Client.send(command));
            fileUrls[fieldName].push(`${process.env.CLOUDFLARE_R2_BUCKET_URL}/${key}`);

        }
    }
};



// ------------------------- ROUTES -------------------------



/**
 * @route   GET /api/v1/item
 * @desc    Get all items with pagination
 * @access  Public
 * @params  page, limit, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/item?page=1&limit=10&search=keyword&category=category
 **/

router.get("/", async (req, res) => {
    let category = req.query.category;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || null;

    let query = {};

    if (search && category) {
        query = {
            category: category,
            $or: [{
                    common_name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    scientific_name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    vernacular_names: {
                        $elemMatch: {
                            name: {
                                $regex: search,
                                $options: "i"
                            }
                        },
                    },
                },
            ],
        };
    }

    let totalitems = await Item.countDocuments(query).catch((err) => {
        res.status(400).json({
            status: 400,
            message: "Error retrieving items",
            error: err,
        });
    });

    let items = await Item.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-__v -_id")
        .then(async (items) => {
            let newItems = [];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];

                let created_by = await User.findOne({ user_id: item.created_by })
                    .select("first_name last_name -_id")
                    .then((user) => {
                        return user.first_name + " " + user.last_name;
                    });

                let updated_by = await User.findOne({ user_id: item.updated_by })
                    .select("first_name last_name -_id")
                    .then((user) => {
                        return user.first_name + " " + user.last_name;
                    });

                newItems.push({
                    ...item._doc,
                    created_by: created_by,
                    updated_by: updated_by,
                });
            }
            return newItems;
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: "Error retrieving items",
                error: err,
            });
        });

    res.status(200).json({
        status: 200,
        message: "Items retrieved successfully",
        data: {
            items: items,
            meta: {
                page: page,
                limit: limit,
                pages: Math.ceil(totalitems / limit),
                total: totalitems,
                search: search,
                category: category,
            },
        },
    });
});




/**
 * @route   GET /api/v1/item/:id
 * @desc    Get an item by item_id
 * @access  Public
 * @params  item_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/item/123456
 **/

router.get("/:id", async (req, res) => {
    const itemId = req.params.id;

    await Item.findOne({ item_id: itemId })
        .select("-__v -_id -created_by -updated_by")
        .then((item) => {
            res.status(200).json({
                status: 200,
                message: "Item retrieved successfully",
                data: item,
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: "Error retrieving item",
                error: err,
            });
        });
});




/**
 * @route   POST /api/v1/item
 * @desc    Create new item
 * @access  Admin, Super Admin
 * @params  scientific_name, images, description, category, vernacular_names, more_info
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/item
 **/

router.post("/", verifyToken, upload.fields([{ name: "image", maxCount: 1 }, { name: "diagram", maxCount: 1 }]), async (req, res) => {
    const scientificNameExists = await Item.findOne({
        scientific_name: req.body.scientific_name,
    });

    if (scientificNameExists) {
        return res.status(400).json({
            status: 400,
            message: "Scientific Name Already Exists",
        });
    }

    const uploadPromises = [];
    const fileUrls = {
        image: [],
        diagram: [],
    };

    await Promise.all([
        handleFiles("image", req, uploadPromises, fileUrls),
        handleFiles("diagram", req, uploadPromises, fileUrls),
    ]);

    await Promise.all(uploadPromises);

    const newItem = new Item({
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        images: fileUrls,
        description: req.body.description,
        category: req.body.category,
        vernacular_names: req.body.vernacular_names,
        more_info: req.body.more_info,

        created_by: req.user.user_id,
        updated_by: req.user.user_id,
    });

    await newItem
        .save()
        .then((item) => {
            res.status(201).json({
                status: 201,
                message: "Item created successfully",
                data: item,
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: "Error creating item",
                error: err,
            });
        });
});



/**
 * @route   PATCH /api/v1/item/:id
 * @desc    Update a item by item_id
 * @access  Admin, Super Admin
 * @params  item_id, scientific_name, images, description, category, vernacular_names, more_info
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/item/123456
 **/

router.patch("/:id", verifyToken, upload.fields([ { name: "image", maxCount: 1 }, { name: "diagram", maxCount: 1 }]), async (req, res) => {
    const itemId = req.params.id;

    const uploadPromises = [];
    const fileUrls = {
        image: [],
        diagram: [],
    };

    await Promise.all([
        handleFiles("image", req, uploadPromises, fileUrls),
        handleFiles("diagram", req, uploadPromises, fileUrls),
    ]);

    await Promise.all(uploadPromises);

    const updatedItem = {
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        images: fileUrls,
        description: req.body.description,
        category: req.body.category,
        vernacular_names: req.body.vernacular_names,
        more_info: req.body.more_info,
        updated_by: req.user.user_id,
    };

    await Item.findOneAndUpdate(
        { item_id: itemId },
        { $set: updatedItem },
        { new: true })
        .then((item) => {
            res.status(200).json({
                status: 200,
                message: "Item updated successfully",
                data: item,
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: "Error updating item",
                error: err,
            });
        });
});



/**
 * @route   DELETE /api/v1/item/:id
 * @desc    Delete a item by item_id
 * @access  Admin, Super Admin
 * @params  item_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/item/123456
 **/

router.delete("/:id", verifyToken, async (req, res) => {
    const itemId = req.params.id;

    await Item.findOneAndDelete({
            item_id: itemId
        })
        .then((item) => {
            res.status(200).json({
                status: 200,
                message: "Item deleted successfully",
                // data: item
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: "Error deleting item",
                error: err,
            });
        });
});



module.exports = router;