const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body

    try {
        const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } })
        if (chat) return res.status(200).json(chat)
        const newChat = new chatModel({
            members: [firstId, secondId]
        })
        const response = await newChat.save()
        return res.status(201).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })

    }
}

const findUserChat = async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await chatModel.find({ members: { $in: [userId] } })
        return res.status(200).json({ chats })
    } catch (error) {
        return res.status(500).json(error)
    }
}


const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
        const chats = await chatModel.find({ members: { $all: [firstId, secondId] } })

        return res.status(200).json(chats)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { createChat, findUserChat, findChat }