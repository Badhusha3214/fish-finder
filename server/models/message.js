
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const MessageSchema = new mongoose.Schema({
    message_id: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid()
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    }
}, { collection: 'messages' })

module.exports = mongoose.model('Message', MessageSchema);