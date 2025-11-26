import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"
import { useEffect } from "react"

const AuthGuard = ({children}) => {
    const navigate = useNavigate()
    const {session} = useUserStore()
    useEffect(() => {
        
    }, [])
    return (
        children
    )
}


export default AuthGuard