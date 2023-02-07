import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Register />
    }
])