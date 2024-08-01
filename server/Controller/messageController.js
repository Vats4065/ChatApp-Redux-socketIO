const messageModel = require("../Models/messageModel")

const createMessage = async (req, res) => {
    const { senderId, chatId, text } = req.body
    try {
        const message = await messageModel.create({ chatId, text, senderId })
        return res.status(201).json(message)

    } catch (error) {
        return res.status(500).json("Internal Server Errors")
    }
}

const getMessage = async (req, res) => {
    const { chatId } = req.params
    try {
        const messages = await messageModel.findOne({ chatId })
        return res.status(200).json({ messages })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { createMessage, getMessage }