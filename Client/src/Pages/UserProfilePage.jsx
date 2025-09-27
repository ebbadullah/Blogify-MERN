import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPublicUserProfileApi } from "../store/service/auth/api"
const BASE_URL = import.meta.env.VITE_API_BASE_URL


const UserProfilePage = () => {
    const { id } = useParams()
    const [data, setData] = useState({ user: null, blogs: [], loading: true, error: null })

    useEffect(() => {
        let mounted = true
        const run = async () => {
            try {
                const res = await getPublicUserProfileApi(id)
                if (mounted) setData({ user: res.user, blogs: res.blogs || [], loading: false, error: null })
            } catch (e) {
                if (mounted) setData((s) => ({ ...s, loading: false, error: "Failed to load profile" }))
            }
        }
        run()
        return () => { mounted = false }
    }, [id])

    if (data.loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }
    if (data.error || !data.user) {
        return <div className="min-h-screen flex items-center justify-center">{data.error || "User not found"}</div>
    }

    const avatar = data.user.avatar ? (data.user.avatar.startsWith("/") ? `${BASE_URL}${data.user.avatar}` : data.user.avatar) : `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name || "User")}&background=111111&color=ffffff&size=128`

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center space-x-6">
                        <img src={avatar} alt={data.user.name} className="h-20 w-20 rounded-full object-cover" />
                        <div>
                            <h1 className="text-3xl font-bold">{data.user.name}</h1>
                            <p className="text-gray-300">{data.user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-xl font-semibold mb-6">Blogs</h2>
                {data.blogs.length === 0 ? (
                    <div className="text-gray-500">No blogs yet.</div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {data.blogs.map((b) => (
                            <div key={b._id} className="bg-white rounded-xl shadow overflow-hidden">
                                <div className="h-48 overflow-hidden">
                                    <img src={b.imageUrl?.startsWith("/") ? `${BASE_URL}${b.imageUrl}` : b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <Link to={`/blog/${b._id}`} className="text-lg font-semibold hover:underline">{b.title}</Link>
                                    <p className="text-gray-600 mt-2 line-clamp-2">{b.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfilePage


