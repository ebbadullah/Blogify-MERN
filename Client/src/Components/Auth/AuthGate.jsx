import { Link } from "react-router-dom"

const AuthGate = ({ onContinue }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="flex justify-center">
                    <div className="flex items-center">
                        <svg className="h-10 w-10 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-bold text-2xl tracking-tight text-black">BLOGIFY</span>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to Blogify</h2>
                    <p className="mt-2 text-gray-600">Please sign in or create an account to continue</p>
                </div>

                <div className="mt-8 space-y-4">
                    <Link to="/auth?mode=signup" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300">Join Now</Link>
                    <Link to="/auth" className="w-full flex justify-center py-3 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300">Login</Link>
                    {onContinue && (
                        <button onClick={onContinue} className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300">Continue as Guest</button>
                    )}
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>By signing up, you agree to our <a href="#" className="font-medium text-black hover:text-gray-800">Terms of Service</a> and <a href="#" className="font-medium text-black hover:text-gray-800">Privacy Policy</a></p>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                <p>Blogify - A modern platform for sharing your thoughts and ideas</p>
            </div>
        </div>
    )
}

export default AuthGate