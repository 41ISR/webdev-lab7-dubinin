import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"
import { useMessageStore } from "../store/useMessageStore"

const MessageCard = ({ likes, id, content, username, createdAt, userId, likedBy, reportedBy = [] }) => {
    const { session } = useUserStore()
    const { getMessages } = useMessageStore()

    const handleDelete = async () => {
        try {
            await api.deleteMessage(id)
            await getMessages()
        } catch (error) {
            alert(error.response?.data?.error || 'Ошибка при удалении сообщения')
        }
    }

    const handleReport = async () => {
        try {
            await api.reportMessage(id)
            await getMessages()
            alert('Жалоба отправлена')
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Ошибка при отправке жалобы'
            alert(errorMessage)
        }
    }

    const handleLike = async () => {
        try {
            await api.likeMessage(id)
            await getMessages()
        } catch (error) {
            console.error('Ошибка при лайке:', error)
        }
    }

    const isLiked = likedBy.some((likedUserId) => likedUserId === session?.user.id)
    const isReported = reportedBy.some((reportedUserId) => reportedUserId === session?.user.id)

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
                <button onClick={handleLike} className="action-button"><span>{likes} {isLiked ? "💗" : "🤍"}</span><span>Нравится</span></button>
                <button 
                    onClick={handleReport} 
                    className="action-button" 
                    disabled={isReported}
                    title={isReported ? "Вы уже пожаловались на это сообщение" : ""}
                >
                    <span>🚩</span><span>{isReported ? "Пожаловано" : "Пожаловаться"}</span>
                </button>
                {isOwn && <button onClick={handleDelete} className="action-button delete" ><span>❌</span><span>Удалить</span></button>}
            </div>
        </div>
    )
}

export default MessageCard