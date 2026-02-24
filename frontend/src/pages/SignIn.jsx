import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { api } from "../api/api"
import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

const SignIn = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setSession } = useUserStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        try {
            const data = await api.loginUser(user)
            console.log(data);
            
            setSession(data.data)
            navigate("/")
        } catch (error) {
            setError(error.response.data.error)
            console.error(error)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Вход</h1>
                {error.length > 0 && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        label="Имя пользователя"
                        required
                        placeholder="Введите имя пользователя"
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        label="Пароль"
                        required
                        placeholder="Введите пароль"
                    />
                    <Button>Войти</Button>
                </form>
                <div className="auth-footer">
                    <p>
                        <Link to={"/signup"}>Регистрация</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn