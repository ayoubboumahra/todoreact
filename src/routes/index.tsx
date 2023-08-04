import { createBrowserRouter } from "react-router-dom";
import TodoList from "../pages/todos";
import Layout from "../layouts";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ProtectedRoute from "./protected";
import TodoDetail from "../pages/todos/show";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <ProtectedRoute el={<TodoList/>} required={true} />
                
            },
            {
                path: "/login",
                element: <ProtectedRoute el={<Login />} required={false} />
            },
            {
                path: "/register",
                element: <ProtectedRoute el={<Register />} required={false} />
            },
            {
                path: "/:id",
                element: <ProtectedRoute el={<TodoDetail/>} required={true} />
                
            },
        ]
    }
]);

export default router;