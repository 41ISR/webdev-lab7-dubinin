import { createBrowserRouter } from "react-router-dom"
import SignUp from "../pages/SignUp"
import SignIn from "../pages/SignIn"
import Layout from "../pages/Layout"
import Board from "../pages/Board"
import Logout from "../pages/Logout"
import MyMessages from "../pages/MyMessages"
import AuthGuard from "../components/AuthGuard"

export const router = createBrowserRouter(
    [
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/signin",
            element: <SignIn />
        },

        {
            path: "/logout",
            element: <Logout />
        },
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Board />
                },
                {
                    path: "/my-messages",
                    element: (
                        <AuthGuard>
                            <MyMessages />
                        </AuthGuard>
                    )
                },
            ]
        }
    ]
)