import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteBlog } from "../../redux/blog/blogSlice"
import toast from "react-hot-toast"

const BlogCard = ({ post }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    
    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(window.confirm('Are you sure you want to delete this blog?')) {
            dispatch(deleteBlog(post._id))
                .unwrap()
                .then(() => toast.success('Blog deleted successfully'))
                .catch(err => toast.error('Failed to delete blog'))
        }
    }
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 mb-6">
            <div className="relative overflow-hidden h-52">
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="w-full h-full object-cover object-center" src={post.image || "/placeholder.svg"} alt={post.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4">
                    <motion.span whileHover={{ scale: 1.05 }} className="bg-black text-white text-xs px-3 py-1.5 rounded-full uppercase tracking-wide font-medium">{post.category}</motion.span>
                </div>
                
                {user && post.author && user._id === post.author._id && (
                    <div className="absolute top-4 right-4">
                        <button 
                            onClick={handleDelete} 
                            className="p-2 bg-black rounded-full text-white hover:bg-gray-800 transition-colors"
                            title="Delete blog"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-100 transition-colors">
                        <ArrowUpRight className="h-5 w-5" />
                    </Link>
                </motion.div>
            </div>

            <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime} min read</span>
                </div>

                <Link to={`/blog/${post.id}`}>
                    <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-black transition-colors duration-300 line-clamp-2">{post.title}</h2>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center pt-2 border-t border-gray-100">
                    <img className="h-10 w-10 rounded-full object-cover mr-3 ring-2 ring-white" src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BlogCard