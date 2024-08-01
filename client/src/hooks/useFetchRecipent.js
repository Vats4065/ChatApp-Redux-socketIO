import { useEffect, useState } from 'react'

const useFetchRecipent = (chat, user) => {

    const [recipientUser, setRecipientUser] = useState(null)

    const recipientId = chat?.members?.find((id) => id !== user?._id)

    useEffect(() => {
        const getUser = async () => {
            if (recipientId) {
                const response = await fetch(`http://localhost:5000/api/user/user/${recipientId}`)
                const data = await response.json()

                setRecipientUser(data?.user)
            }
        }
        getUser()
    }, [recipientId])


    console.log(recipientId);
    return { recipientUser }
}

export default useFetchRecipent