import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchUsersApi } from "../../store/service/auth/api"
const BASE_URL = import.meta.env.VITE_API_BASE_URL


const SearchUsers = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const timeoutRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const onClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener("click", onClick)
        return () => document.removeEventListener("click", onClick)
    }, [])

    const runSearch = async (q) => {
        if (!q.trim()) {
            setResults([])
            return
        }
        try {
            const data = await searchUsersApi(q.trim())
            setResults(data)
        } catch (e) {
            setResults([])
        }
    }

    const onChange = (e) => {
        const val = e.target.value
        setQuery(val)
        setOpen(true)
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => runSearch(val), 250)
    }

    return (
        <div className="relative" ref={containerRef}>
            <input
                value={query}
                onChange={onChange}
                onFocus={() => { if (results.length) setOpen(true) }}
                placeholder="Search users..."
                className="block w-64 pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
            />
            {open && results.length > 0 && (
                <div className="absolute mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <ul className="max-h-80 overflow-auto">
                        {results.map((u) => (
                            <li key={u._id}>
                                <button
                                    onClick={() => { setOpen(false); setQuery(""); navigate(`/user/${u._id}`) }}
                                    className="w-full text-left flex items-center px-3 py-2 hover:bg-gray-50"
                                >
                                    <img
                                        src={u.avatar ? (u.avatar.startsWith("/") ? `${BASE_URL}${u.avatar}` : u.avatar) : `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "User")}&background=111111&color=ffffff&size=64`}
                                        alt={u.name}
                                        className="h-8 w-8 rounded-full object-cover mr-3"
                                    />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                        <div className="text-xs text-gray-500">{u.email}</div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchUsers


