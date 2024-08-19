
let express = require('express');
let router = express.Router();

let Item = require('../../models/items');



/**
 * @route   GET /api/v1/search
 * @desc    search suggestions
 * @access  Public
 * @params  category, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/search?category=category&query=keyword
**/

router.get('/', async (req, res) => {

    let category = req.query.category;
    let search = req.query.query || null;

    let query = {};

    if (search && category) {
        query = {
            category: category,
            // category: { $regex: category, $options: 'i' },
            $or: [
                { common_name: { $regex: search, $options: 'i' } },
                { scientific_name: { $regex: search, $options: 'i' } },
                { vernacular_names: { $elemMatch: { name: { $regex: search, $options: 'i' } } } }
            ]
        };
    }

    let items = await Item.find(query)
        .select('common_name scientific_name vernacular_names.name item_id -_id')
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving items',
                error: err
            });
        });

    // let names = items.map(item => {
    //     return [item.common_name, item.scientific_name, ...item.vernacular_names.map(name => name.name)].filter(name => name.match(new RegExp(search, 'i')));
    // });

    let names = items.map(item => {
        let data = [item.common_name, item.scientific_name, ...item.vernacular_names.map(name => name.name)].filter(name => name.match(new RegExp(search, 'i')));
        return {
            name: data[0],
            id: item.item_id
        };
    });

    res.status(200).json({
        status: 200,
        message: 'Search results',
        data: names
    });

});



// router.get('/', async (req, res) => {

//     let category = req.query.category;
//     let query = req.query.query;

//     if (!query || !category) {
//         return res.status(400).json({
//             message: 'Search query or category is missing',
//         });
//     }

//     let searchResults = await Item.aggregate([
//         {
//             $search: {
//                 index: 'default',
//                 compound: {
//                     should: [
//                         {
//                             text: {
//                                 query: query,
//                                 path: 'common_name',
//                                 fuzzy: {}
//                             }
//                         },
//                         {
//                             text: {
//                                 query: query,
//                                 path: 'scientific_name',
//                                 fuzzy: {}
//                             }
//                         },
//                         {
//                             text: {
//                                 query: query,
//                                 path: 'vernacular_names.name',
//                                 fuzzy: {}
//                             }
//                         }
//                     ]
//                 }
//             }
//         },
//         {
//             $match: {
//                 category: category
//             }
//         },
//         {
//             $limit: 10,
//         }
//     ]);

//     let names = searchResults.map(item => {
//         return [item.common_name, item.scientific_name, ...item.vernacular_names.map(name => name.name)].filter(name => name.match(new RegExp(query, 'i')));
//     });

//     res.status(200).json({
//         message: 'Search results',
//         data: names.flat()
//     });

// });



module.exports = router;