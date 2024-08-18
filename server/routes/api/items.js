
const express = require('express');
const router = express.Router();

const Item = require('../../models/items');
const verifyToken = require('../../middleware/authentication');



/**
 * @route   GET /api/v1/items
 * @desc    Get all items with pagination
 * @access  Public
 * @params  page, limit, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/items?page=1&limit=10&search=keyword&category=category
**/

router.get('/', async (req, res) => {

    let category = req.query.category;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || null;

    let query = {};

    if (search && category) {
        query = {
            category: category,
            $or: [
                { common_name: { $regex: search, $options: 'i' } },
                { scientific_name: { $regex: search, $options: 'i' } },
                { vernacular_names: { $elemMatch: { name: { $regex: search, $options: 'i' } } } }
            ]
        };
    }

    let totalitems = await Item.countDocuments(query)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving items',
                error: err
            });
        });

    let items = await Item.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-__v -_id')
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving items',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'Items retrieved successfully',
        data: {
            items: items,
            meta: {
                page: page,
                limit: limit,
                pages: Math.ceil(totalitems / limit),
                total: totalitems,
                search: search,
                category: category
            }
        }
    });

});



/**
 * @route   GET /api/v1/items/:id
 * @desc    Get an item by item_id
 * @access  Public
 * @params  item_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/items/123456
**/

router.get('/:id', async (req, res) => {

    const itemId = req.params.id;

    await Item.findOne({ item_id: itemId })
        .select('-__v -_id')
        .then(item => {
            res.status(200).json({
                status: 200,
                message: 'Item retrieved successfully',
                data: item
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving item',
                error: err
            });
        });

});



/**
 * @route   POST /api/v1/items
 * @desc    Create new item
 * @access  Admin, Super Admin
 * @params  scientific_name, images, description, category, vernacular_names
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 * 
 * @example /api/v1/items
**/

router.post('/', verifyToken, async (req, res) => {
    const newItem = new Item({
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        images: req.body.images,
        description: req.body.description,
        category: req.body.category,
        vernacular_names: req.body.vernacular_names,
    });

    await newItem.save()
        .then(item => {
            res.status(201).json({
                status: 201,
                message: 'Item created successfully',
                // data: item
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error creating item',
                error: err
            });
        });
});



/**
 * @route   PATCH /api/v1/items/:id
 * @desc    Update a item by item_id
 * @access  Admin, Super Admin
 * @params  item_id, scientific_name, images, description, category, vernacular_names
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/items/123456
**/

router.patch('/:id', verifyToken, async (req, res) => {
    const itemId = req.params.id;

    await Item.findOneAndUpdate({ item_id: itemId }, {
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        images: req.body.images,
        description: req.body.description,
        category: req.body.category,
        vernacular_names: req.body.vernacular_names,
        updated_at: Date.now()
    })
        .then(item => {
            res.status(200).json({
                status: 200,
                message: 'Item updated successfully',
                data: item
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error updating item',
                error: err
            });
        });
});



/**
 * @route   DELETE /api/v1/items/:id
 * @desc    Delete a item by item_id
 * @access  Admin, Super Admin
 * @params  item_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/items/123456
**/

router.delete('/:id',  verifyToken, async (req, res) => {
    const itemId = req.params.id;

    await Item.findOneAndDelete({ item_id: itemId })
        .then(item => {
            res.status(200).json({
                status: 200,
                message: 'Item deleted successfully',
                // data: item
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error deleting item',
                error: err
            });
        });
});



module.exports = router;