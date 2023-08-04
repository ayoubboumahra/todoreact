import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Navbar from "../components/Navbar";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <div className="container mx-auto my-4 relative">
                <Outlet />
            </div>
            <ToastContainer />
        </>
    )
}

export default Layout;