import { useState, useEffect } from "react"

const Loader = () => {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev < 3 ? prev + 1 : 1))
        }, 400)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="relative">
                <svg className="h-16 w-16 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="absolute inset-0 rounded-full border-4 border-black opacity-20 animate-ping"></div>
            </div>

            <div className="mt-4 text-xl font-bold text-black">BLOGIFY</div>

            <div className="mt-2 text-gray-600">Loading{".".repeat(dots)}</div>

            <div className="w-48 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-black animate-loadingBar"></div>
            </div>
        </div>
    )
}

export default Loader