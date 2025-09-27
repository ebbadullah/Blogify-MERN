import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, MessageCircle, Tag, Facebook, Twitter, Linkedin, Link2, Trash2, Edit } from "lucide-react"
import BlogArticle from "./BlogArticle"
import { likeBlog, readBlog, fetchComments, addComment, removeComment, deleteBlog } from "../../redux/blog/blogSlice"
import { getImageUrl, formatDate, formatNumber } from "../../Utils/helpers"
import toast from "react-hot-toast"

const API_BASE = import.meta.env.VITE_API_BASE_URL;


const BlogDetails = ({ post: postProp, relatedPosts = [], onBack, onViewIncrement }) => {
    const { id: routeId } = useParams()
    const navigate = useNavigate()
    const [fetchedPost, setFetchedPost] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const authUser = useSelector((s) => s.auth.user)
    const commentsByBlogId = useSelector((s) => s.blog.commentsByBlogId)
    const allBlogs = useSelector((s) => s.blog.blogs)

    const post = useMemo(() => postProp ?? fetchedPost, [postProp, fetchedPost])

    useEffect(() => {
        let ignore = false
        const needFetch = !postProp && routeId
        if (!needFetch) return

        const run = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch(`${API_BASE}/api/blogs/${routeId}`)
                if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`)
                const data = await res.json()
                if (!ignore) setFetchedPost(data)
            } catch (e) {
                if (!ignore) setError(e.message || "Failed to load post")
            } finally {
                if (!ignore) setLoading(false)
            }
        }

        run()
        return () => { ignore = true }
    }, [postProp, routeId])

    useEffect(() => {
        if (post?._id) {
            dispatch(readBlog(post._id))
            dispatch(fetchComments(post._id))
        }
    }, [post?._id, dispatch])

    const [isLiked, setIsLiked] = useState(false)
    const [showShareMenu, setShowShareMenu] = useState(false)
    const [showLikedUsers, setShowLikedUsers] = useState(false)
    const [commentText, setCommentText] = useState("")

    const handleLike = async () => {
        if (!post?._id) return
        try {
            setIsLiked((v) => !v)
            await dispatch(likeBlog(post._id))
        } catch (e) {
            setIsLiked((v) => !v)
        }
    }

    const handleAddComment = async () => {
        if (!post?._id || !commentText.trim()) return
        await dispatch(addComment({ id: post._id, text: commentText.trim() }))
        setCommentText("")
    }

    const handleDeleteComment = async (commentId) => {
        if (!post?._id) return
        await dispatch(removeComment({ id: post._id, commentId }))
    }

    const handleShare = (platform) => {
        const url = window.location.href
        const title = post?.title || ""

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            copy: url,
        }

        if (platform === "copy") {
            navigator.clipboard.writeText(url)
            alert("Link copied to clipboard!")
        } else {
            window.open(shareUrls[platform], "_blank", "width=600,height=400")
        }

        setShowShareMenu(false)
    }

    if (!postProp && loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading article…</p>
            </div>
        )
    }

    if (!postProp && error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-500 text-lg">Failed to load post — {error}</p>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-500 text-lg">Blog post not found</p>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={onBack} className="flex items-center text-gray-600 hover:text-black transition-colors mb-8">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Articles
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {(post.imageUrl || post.image) && (
                    <div className="mb-10">
                        <img src={getImageUrl(post.imageUrl || post.image) || "/placeholder.svg"} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                    </div>
                )}

                <div className="mb-10">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Tag className="h-4 w-4" />
                        <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-4">
                            <img src={getImageUrl(post.author?.avatar) || "/default-avatar.png"} alt={post.author?.name || "Author"} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                            <div>
                                <p className="font-semibold text-gray-900">{post.author?.name || "Anonymous"}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(post.createdAt)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        5 min read
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {formatNumber(post.views)}
                                </span>
                                <div className="relative" onMouseEnter={() => setShowLikedUsers(true)} onMouseLeave={() => setShowLikedUsers(false)}>
                                    <span className="flex items-center gap-1 cursor-pointer">
                                        <Heart className="h-4 w-4" />
                                        {formatNumber(post.likes)}
                                    </span>

                                    {showLikedUsers && (post.likedBy?.length || 0) > 0 && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white p-3 rounded-lg shadow-lg z-10 min-w-48">
                                            <p className="text-xs font-medium mb-2">Liked by:</p>
                                            <div className="space-y-2">
                                                {post.likedBy.slice(0, 3).map((entry, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <img src={getImageUrl(entry.userId?.avatar) || "/default-avatar.png"} alt={entry.userId?.name || "User"} className="w-6 h-6 rounded-full" />
                                                        <span className="text-xs">{entry.userId?.name || "Anonymous User"}</span>
                                                    </div>
                                                ))}
                                                {post.likedBy.length > 3 && <p className="text-xs text-gray-300">+{post.likedBy.length - 3} more</p>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <span className="flex items-center gap-1">
                                    <Share2 className="h-4 w-4" />
                                    {formatNumber(post.shares)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <motion.button onClick={handleLike} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`p-2 rounded-full transition-colors ${isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                                </motion.button>

                                <div className="relative">
                                    <motion.button onClick={() => setShowShareMenu(!showShareMenu)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                        <Share2 className="h-5 w-5" />
                                    </motion.button>

                                    {showShareMenu && (
                                        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2 min-w-40">
                                            <button onClick={() => handleShare("facebook")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                <Facebook className="h-4 w-4" />
                                                Facebook
                                            </button>
                                            <button onClick={() => handleShare("twitter")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                <Twitter className="h-4 w-4" />
                                                Twitter
                                            </button>
                                            <button onClick={() => handleShare("linkedin")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                <Linkedin className="h-4 w-4" />
                                                LinkedIn
                                            </button>
                                            <button onClick={() => handleShare("copy")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                <Link2 className="h-4 w-4" />
                                                Copy Link
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none">
                    <div className="text-gray-800 leading-relaxed space-y-6">
                        <p className="text-xl font-light text-gray-700 mb-8">{post.description}</p>
                        {post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
                    </div>
                </div>

                <div className="mt-16 pt-12 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-8">
                        <MessageCircle className="h-6 w-6 text-gray-600" />
                        <h3 className="text-2xl font-serif font-bold text-gray-900">Comments ({(commentsByBlogId[post._id]?.length) || 0})</h3>
                    </div>

                    {authUser ? (
                        <div className="mb-6">
                            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black" rows={3} />
                            <div className="mt-2 text-right">
                                <button onClick={handleAddComment} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">Post Comment</button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">Login to comment.</div>
                    )}

                    <div className="space-y-4">
                        {(commentsByBlogId[post._id] || []).map((c) => (
                            <div key={c._id} className="flex gap-3 items-start p-4 border border-gray-100 rounded-lg">
                                <img src={getImageUrl(c.userId?.avatar) || "/default-avatar.png"} alt={c.userId?.name || "User"} className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{c.userId?.name || "User"}</p>
                                            <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
                                        </div>
                                        {(authUser?._id === c.userId?._id || authUser?._id === post.author?._id) && (
                                            <button onClick={() => handleDeleteComment(c._id)} className="text-xs text-red-600 hover:underline">Delete</button>
                                        )}
                                    </div>
                                    <p className="mt-2 text-gray-800">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {relatedPosts.length > 0 && (
                <div className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.slice(0, 3).map((relatedPost) => (
                                <div key={relatedPost._id}>
                                    <BlogArticle post={relatedPost} variant="standard" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">Discover more</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(allBlogs || []).slice(0, 6).map((p) => (
                            <BlogArticle key={p._id} post={p} variant="standard" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails