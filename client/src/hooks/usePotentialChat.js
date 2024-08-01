import { useEffect, useState } from 'react'
import axios from 'axios'

const usePotentialChat = (user, chat) => {
    const [potentialChat, setPotentialChat] = useState([])
    const [createChat, setCreateChat] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    const [messageError, setMessageError] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch('http://localhost:5000/api/user/allUser')
            if (response.error) {
                return console.log(response)
            }
            const data = await response.json()

            const pChat = data?.users.filter((u) => {
                let isChatCreated = false
                if (user?._id === u?._id) return false
                if (chat) {
                    isChatCreated = chat?.chat?.chats?.some((chat) => {

                        return chat?.members[0] === u?._id || chat?.members[1] === u?._id
                    })

                }
                return !isChatCreated
            })
            if (pChat) {
                setPotentialChat(pChat)
            }
        }
        getUser()
    }, [])


    const ChatCreate = async (firstId, secondId) => {
        const response = await axios.post("http://localhost:5000/api/chat", { firstId, secondId })
        if (response.error) {
            return console.log(response)
        }
        setCreateChat((p) => [...p, response])
    }

    const updateCurrentChat = (chat) => {

        setCurrentChat(chat)

    }

    useEffect(() => {
        const getMessage = async () => {
            setIsMessageLoading(true)
            setMessageError(null)
            console.log(currentChat);
            if (currentChat) {
                const response = await axios.get(`http://localhost:5000/api/message/${currentChat?._id}`)
                console.log(response?.data);
                if (response.error) {
                    return setMessageError(response.error)
                }

                if (response?.data && response?.data?.messages) {
                    setIsMessageLoading(false)
                    setMessages(response?.data)
                }
            }
        }

        getMessage()

    }, [currentChat])

    console.log(messages);
    return { potentialChat, ChatCreate, createChat, setCreateChat, updateCurrentChat, messageError, messages, isMessageLoading, currentChat }
}

export default usePotentialChat