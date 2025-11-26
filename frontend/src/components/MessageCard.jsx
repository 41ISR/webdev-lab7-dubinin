import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"
import { useMessageStore } from "../store/useMessageStore"

const MessageCard = ({ id, likes, content, username, createdAt, userId, likedBy }) => {
    const { session } = useUserStore()
    const { getMessages } = useMessageStore()

    const handleDelete = async () => {
        await api.deleteMessage(id)
        await getMessages()
    }

    const handleReport = async () => {
        await api.reportMessage(id)
        await getMessages()
    }

    const handleLike = async () => {
        await api.likeMessage(id)
        await getMessages()
    }

    const isLiked = likedBy.some((likedUserId) => likedUserId === session?.user.id)

    const isOwn = session?.user.id === userId
    return (
        <div className="message-card">
            <div className="message-content">
                {content}
            </div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                <button onClick={handleLike} className="action-button"><span>{likes}{isLiked ? "💗" : "🤍"}</span><span>Нравится</span></button>
                <button onClick={handleReport} className="action-button"><span>🚩</span><span>Пожаловаться</span></button>
                {isOwn && <button onClick={handleDelete} className="action-button delete" ><span>❌</span><span>Удалить</span></button>}
            </div>
        </div>
    )
}

export default MessageCard