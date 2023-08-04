import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../store/reducers/AuthReducer";

export default function(){
    
    const [show, setShow] = useState(false);

    const user = useSelector(getUser);
    
    const showMobileNav = () => {
        setShow(s => !s);
    }

    return (
        <nav className="bg-purple-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button onClick={showMobileNav} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white ">
                            <span className="absolute -inset-0.5"></span>
                            <i className="fa-solid fa-bars fa-2x"></i>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center" title="logo">
                            <i className="fa-solid fa-rectangle-list fa-2x text-white"></i>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                { user && <Link to={"/"} className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Mes todos</Link> }
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            user ? (
                                <p className="text-white text-xs sm:text-md"><span className="font-medium">{user.username.toUpperCase()}</span></p>
                            ) : (
                                <>
                                    <Link to={"/login"} className="relative rounded px-3 py-1 mr-2 font-medium overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
                                        Login
                                    </Link>
                                    <Link to={"/register"} className="relative rounded px-3 py-1 font-medium overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                                        Register
                                    </Link>
                                </>
                            )
                        }
                        
                    </div>
                </div>
            </div>
            {
                show && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            { user && <Link to={"/"} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">Mes todos</Link> }
                        </div>
                    </div>
                )
            }
        </nav>
    )
}