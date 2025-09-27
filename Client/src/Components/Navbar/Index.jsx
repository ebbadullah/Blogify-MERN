import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, Search, User, LogOut } from "lucide-react"
import Logo from "./Logo"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/auth/authSlice"
import SearchUsers from "../Search/SearchUsers"
const BASE_URL = import.meta.env.VITE_API_BASE_URL


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const toggleMenu = () => setIsOpen(!isOpen)

    const handleLogout = () => {
        dispatch(logout())
        navigate("/auth")
    }

    return (
        <nav className="bg-black text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <Logo />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white">Home</Link>
                            <Link to="/blogs" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white">Blogs</Link>
                            <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white">About</Link>
                            <Link to="/contact" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white">Contact</Link>
                        </div>

                        <SearchUsers />

                        <div className="flex items-center space-x-3">
                            {user ? (
                                <>
                                    <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-gray-300">
                                        <img
                                            src={user.avatar ? (user.avatar.startsWith("/") ? `${BASE_URL}${user.avatar}` : user.avatar) : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=111111&color=ffffff&size=64`}
                                            alt={user.name || "User"}
                                            className="h-6 w-6 rounded-full object-cover"
                                        />
                                        <span>{user.name || "Profile"}</span>
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-all duration-300">
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/auth" className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-all duration-300">Login</Link>
                                    <Link to="/auth?mode=signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-all duration-300">Sign up</Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex md:hidden items-center">
                        <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-black">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">Home</Link>
                        <Link to="/blogs" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">Blogs</Link>
                        <Link to="/about" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">About</Link>
                        <Link to="/contact" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">Contact</Link>
                    </div>

                    <div className="px-2 py-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input type="text" placeholder="Search..." className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm" />
                        </div>
                    </div>

                    <div className="px-2 py-3 flex space-x-3">
                        {user ? (
                            <>
                                <Link to="/profile" className="w-1/2 flex justify-center items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-all duration-300">Profile</Link>
                                <button onClick={handleLogout} className="w-1/2 flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-all duration-300">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth" className="w-1/2 flex justify-center items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-all duration-300">Login</Link>
                                <Link to="/auth?mode=signup" className="w-1/2 flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-all duration-300">Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar