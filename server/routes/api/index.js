
const express = require('express');
const router = express.Router();


const usersRouter = require('./users');
const itemsRouter = require('./items');
const suggestionsRouter = require('./suggestions');
const messagesRouter = require('./message');
const searchRouter = require('./search');


router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/suggestions', suggestionsRouter);
router.use('/messages', messagesRouter);
router.use('/search', searchRouter);


module.exports = router;
