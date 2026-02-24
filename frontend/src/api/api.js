import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
    baseURL: "https://kitek.ktkv.dev/feedback/api/",
    headers: {
        "Content-Type": "application/json"
    }
})

apiInstance.interceptors.request.use((config) => {
    const { session } = useUserStore.getState()

    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

const getMessages = async () => {
    const data = await apiInstance.get("/messages")
    return data.data
}

const registerUser = async (user) => {
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const sendMessage = async (message) => {
    const res = await apiInstance.post("/messages", message)
    return res
}

const deleteMessage = async (id) => {
    const res = await apiInstance.delete(`/messages/${id}`)
    return res
}

const reportMessage = async (id) => {
    const res = await apiInstance.post(`/messages/${id}/report`)
    return res
}

const likeMessage = async (id) => {
    const res = await apiInstance.post(`/messages/${id}/like`)
    return res
}

export const api = {
    likeMessage,
    reportMessage,
    getMessages,
    registerUser,
    loginUser,
    sendMessage,
    deleteMessage
}