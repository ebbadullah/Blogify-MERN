import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { register, login, clearError } from "../../redux/auth/authSlice"

const AuthForm = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, user } = useSelector((state) => state.auth)

    const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup")
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const toggleMode = () => {
        dispatch(clearError())
        navigate(isLogin ? "/auth?mode=signup" : "/auth")
        setIsLogin(!isLogin)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isLogin && formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match!")
            return
        }

        try {
            const body = isLogin
                ? { email: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, password: formData.password }

            await dispatch(isLogin ? login(body) : register(body)).unwrap()
            if (isLogin) {
                toast.success("Login successful!")
                navigate("/")
            } else {
                toast.success("Account created successfully! Set up your profile.")
                navigate("/setup-profile")
            }
        } catch (err) {
            toast.error(err || "Something went wrong")
        }
    }

    useEffect(() => {
        if (user && isLogin) {
            navigate("/")
        }
    }, [user, isLogin, navigate])

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">{isLogin ? "Welcome Back" : "Join Blogify"}</h2>
                <p className="text-gray-600 font-light">{isLogin ? "Sign in to continue to your account" : "Create your account to get started"}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="mt-1">
                            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black transition-all duration-300 sm:text-sm" placeholder="Ebad Ullah" />
                        </div>
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black transition-all duration-300 sm:text-sm" placeholder="ebad@devVertex.com" />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="mt-1 relative">
                        <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={isLogin ? "current-password" : "new-password"} required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black transition-all duration-300 sm:text-sm" placeholder="••••••••" />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                </div>

                {!isLogin && (
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="mt-1">
                            <input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={handleChange} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black transition-all duration-300 sm:text-sm" placeholder="••••••••" />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center text-gray-500 cursor-pointer">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                    </div>
                )}

                {isLogin && (
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-black hover:text-gray-800 transition-all duration-300">Forgot your password?</a>
                        </div>
                    </div>
                )}

                <div>
                    <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <>
                                {isLogin ? "Sign in" : "Create account"}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </motion.button>
                </div>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-light">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300">Google</motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300">GitHub</motion.button>
                </div>

                <div className="mt-8">
                    <motion.button onClick={toggleMode} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300">
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default AuthForm