
const e = require('cors');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const ItemSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid()
    },
    common_name: {
        type: String,
        required: true
    },
    scientific_name: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true,
        default: []
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['marine', 'freshwater', 'brackish']
    },
    vernacular_names: {
        type: Array,
        required: true,
        default: []
    },
    more_info: {
        type: String,
        required: false,
        default: ''
    },
    
    created_by: {
        type: String,
        required: true
    },
    updated_by: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: false,
        default: Date.now
    }
}, { collection: 'items' });

module.exports = mongoose.model('item', ItemSchema);