
const express = require('express');
const router = express.Router();

const message = require('../../models/message');
const verifyToken = require('../../middleware/authentication');



/**
 * @route   GET /api/v1/messages
 * @desc    Get all messages with pagination
 * @access  Admin, Super Admin
 * @params  page, limit, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/messages?page=1&limit=10
**/

router.get('/', verifyToken, async (req, res) => {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || null;

    let query = {};
    if (search) {
        query = { $text: { $search: search } };
    }

    let totalitems = await message.countDocuments(query)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving messages',
                error: err
            });
        });

    let messages = await message.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving messages',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'Messages retrieved successfully',
        data: {
            messages: messages,
            meta: {
                page: page,
                limit: limit,
                pages: Math.ceil(totalitems / limit),
                total: totalitems,
                search: search
            }
        }
    });

});



/**
 * @route   POST /api/v1/messages
 * @desc    Create new message
 * @access  Public
 * @params  author, item_id, email, message
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 * 
 * @example /api/v1/messages
**/

router.post('/', async (req, res) => {
    const newmessage = new message({
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    await newmessage.save()
        .then(message => {
            res.status(201).json({
                status: 201,
                message: 'Message created successfully',
                data: message
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error creating message',
                error: err
            });
        });
});



/**
 * @route   DELETE /api/v1/messages/:id
 * @desc    Delete message by message_id
 * @access  Admin, Super Admin
 * @params  message_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/messages/123456
 **/

router.delete('/:id', verifyToken, async (req, res) => {
    const messageId = req.params.id;

    await message.findOneAndDelete({ message_id: messageId })
        .then(message => {
            res.status(200).json({
                status: 200,
                message: 'Message deleted successfully',
                data: message
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error deleting message',
                error: err
            });
        });
});



module.exports = router;