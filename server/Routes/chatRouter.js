const express = require('express')
const { findChat, createChat, findUserChat } = require('../Controller/chatController')

const chatrouter = express.Router()

chatrouter.post('/', createChat)
chatrouter.get("/:userId", findUserChat)
chatrouter.get("/find/:firstId/:secondId", findChat)

module.exports = chatrouter