
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const SuggestionSchema = new mongoose.Schema({
    suggestion_id: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid()
    },
    item_id: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'acknowledged', 'resolved']
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
}, { collection: 'suggestions' });

module.exports = mongoose.model('suggestions', SuggestionSchema);