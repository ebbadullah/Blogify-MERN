import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
const BASE_URL = import.meta.env.VITE_API_BASE_URL


const getImageUrl = (post) => {
    if (post.imageUrl) {
        return post.imageUrl.startsWith("/")
            ? `${BASE_URL}${post.imageUrl}`
            : post.imageUrl
    }
    if (post.image) return post.image
    return "/placeholder.svg"
}


const FeaturedArticle = ({ post }) => {
    return (
        <motion.article
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
            {/* Left side - Image with parallax effect */}
            <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-[500px]">
                <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover"
                    src={getImageUrl(post)}
                    alt={post.title}
                />


                {/* Featured badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black text-white text-xs font-medium uppercase tracking-wider">
                    Featured
                </div>
            </div>

            {/* Right side - Content */}
            <div className="md:pr-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-xs font-medium uppercase tracking-wider text-gray-900">
                        {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                    </div>
                </div>

                <Link to={`/blog/${post.id}`}>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 group-hover:text-black transition-colors mb-6 leading-tight">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={post.author.avatar || "/placeholder.svg"}
                            alt={post.author.name}
                        />
                        <div className="ml-3">
                            <p className="text-base font-medium text-gray-900">{post.author.name}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>
                    </div>

                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <Link
                            to={`/blog/${post.id}`}
                            className="inline-flex items-center text-base font-medium text-gray-900 hover:text-black transition-colors"
                        >
                            Read Article
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.article>
    )
}

export default FeaturedArticle
