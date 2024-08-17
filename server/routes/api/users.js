
const express = require('express');
const router = express.Router();

const Users = require('../../models/users');
const verifyToken = require('../../middleware/authentication');



/**
 * @route   GET /api/v1/users
 * @desc    Get all users
 * @access  Private
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/users
**/

router.get('/', verifyToken, async (req, res) => {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || null;

    let query = {};
    if (search) {
        query = { $text: { $search: search } };
    }

    let totalUsers = await Users.countDocuments(query)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving users',
                error: err
            });
        });

    let users = await Users.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-__v -_id')
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving users',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'Users retrieved successfully',
        data: {
            users: users,
            meta: {
                page: page,
                limit: limit,
                pages: Math.ceil(totalUsers / limit),
                total: totalUsers,
                search: search
            }
        }
    });

});



/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete a user by id
 * @access  Private
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/users/:id
**/

router.delete('/:id', verifyToken, async (req, res) => {
    
    let user = await Users.findOneAndDelete({ user_id: req.params.id })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error deleting user',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'User deleted successfully',
        // data: user
    });

});



module.exports = router;