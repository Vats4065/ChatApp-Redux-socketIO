const express = require('express');
const { createMessage, getMessage } = require('../Controller/messageController');

const messageRouter = express.Router()

messageRouter.post("/", createMessage)
messageRouter.get("/:chatId", getMessage)

module.exports = messageRouter