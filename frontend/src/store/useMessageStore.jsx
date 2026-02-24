import { create } from "zustand";
import { api } from "../api/api";

export const useMessageStore = create((set) => ({
    messages: [],
    getMessages: async () => {
        try {
            const res = await api.getMessages()
            set({messages: res})
        } catch (error) {
            console.error(error)
        }
    } 
}))