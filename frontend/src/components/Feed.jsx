import { useEffect, useState } from "react"
import { api } from "../api/api"
import MessageCard from "./MessageCard"
import { useMessageStore } from "../store/useMessageStore"
import { useUserStore } from "../store/useUserStore"

const Feed = ({ title = "Сообщения", myOwn = false }) => {
    const { messages, getMessages } = useMessageStore()
    const [timerId, setTimerId] = useState(undefined)
    const { session } = useUserStore()
    useEffect(() => {
        getMessages()
        setTimerId(setInterval(() => {
            getMessages()
        }, 5000))

        return () => { clearInterval(timerId) }
    }, [])

    return (
        <>
            <div className="messages-section">
                <div className="container">
                    <h2 className="section-title">{title}</h2>
                    <div className="messages-grid">
                        {messages && myOwn ?
                            messages
                                .filter((message) =>
                                    message.userId == session.user.id)
                                .map((message, i) => (
                                    <MessageCard key={i} {...message} />
                                ))
                            : messages.map((message, i) => (
                                <MessageCard key={i} {...message} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed