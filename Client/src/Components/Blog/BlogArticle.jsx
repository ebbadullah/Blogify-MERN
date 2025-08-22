"use client"

import { motion } from "framer-motion"
import { getImageUrl as getImg } from "../../Utils/helpers"
import { Calendar, Clock, Eye, Heart, Share2, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog } from "../../redux/blog/blogSlice"

const BlogArticle = ({ post, variant = "standard" }) => {
  const [showLikedUsers, setShowLikedUsers] = useState(false)
  const dispatch = useDispatch()

  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => getImg(imagePath)

  // Format numbers for display
  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k"
    }
    return count.toString()
  }

  // Get liked users for hover display
  const getLikedUsers = () => {
    // In real implementation, you'd fetch user details based on viewedBy array
    // For now, showing mock data structure
    return post.viewedBy?.slice(0, 5) || []
  }

  // Stats component for reuse
  const StatsBar = ({ className = "" }) => (
    <div className={`flex items-center gap-4 text-gray-500 text-sm ${className}`}>
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{formatCount(post.views || 0)}</span>
      </div>

      <div
        className="flex items-center gap-1 relative"
        onMouseEnter={() => setShowLikedUsers(true)}
        onMouseLeave={() => setShowLikedUsers(false)}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            dispatch(likeBlog(post._id))
          }}
          className="inline-flex items-center"
          aria-label="Like"
        >
          <Heart className="h-4 w-4" />
        </button>
        <span>{formatCount(post.likes || 0)}</span>

        {/* Hover tooltip showing liked users */}
        {showLikedUsers && post.likes > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 mb-2 bg-black text-white p-3 rounded-lg shadow-lg z-10 min-w-48"
          >
            <div className="text-xs font-medium mb-2">Liked by:</div>
            <div className="flex flex-col gap-2">
              {getLikedUsers()
                .slice(0, 3)
                .map((user, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img
                      className="h-6 w-6 rounded-full object-cover"
                      src={getImageUrl(user.avatar || "/default-avatar.png")}
                      alt={user.name || "User"}
                    />
                    <span className="text-xs">{user.name || "Anonymous User"}</span>
                  </div>
                ))}
              {post.likes > 3 && <div className="text-xs text-gray-300">and {post.likes - 3} others</div>}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Share2 className="h-4 w-4" />
        <span>{formatCount(post.shares || 0)}</span>
      </div>

      <div className="flex items-center gap-1">
        <MessageCircle className="h-4 w-4" />
        <span>{formatCount(Array.isArray(post.comments) ? post.comments.length : (post.comments || 0))}</span>
      </div>
    </div>
  )

  // Different layouts based on variant
  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <Link to={`/blog/${post._id}`} className="block relative aspect-[4/3] overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
            src={getImageUrl(post.imageUrl || post.image)}
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {post.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-400"></span>
            <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <Link to={`/blog/${post._id}`}>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-2 mb-3">
              {post.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-6 w-6 rounded-full object-cover border-2 border-white shadow-sm"
                src={getImageUrl(post.author?.avatar) || "/placeholder.svg"}
                alt={post.author?.name}
              />
              <span className="ml-2 text-xs text-gray-600 font-medium">{post.author?.name}</span>
            </div>

            <StatsBar />
          </div>
        </div>
      </motion.article>
    )
  }

  if (variant === "large") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
      >
        <Link to={`/blog/${post._id}`} className="block relative aspect-[16/9] overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            src={getImageUrl(post.imageUrl || post.image)}
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wider rounded-full">
              Featured
            </span>
          </div>
        </Link>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1.5 bg-gray-100 text-xs font-medium uppercase tracking-wider text-gray-900 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Link to={`/blog/${post._id}`}>
            <h3 className="text-3xl font-serif font-bold text-gray-900 group-hover:text-black transition-colors mb-4 leading-tight">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">{post.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full object-cover border-3 border-white shadow-lg"
                src={getImageUrl(post.author?.avatar) || "/placeholder.svg"}
                alt={post.author?.name}
              />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{post.author?.name}</p>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <StatsBar />
              <Link
                to={`/blog/${post._id}`}
                className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-0.5 hover:border-black hover:text-black transition-colors"
              >
                Read Article
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  // Default standard variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/blog/${post._id}`} className="block relative aspect-[3/2] overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
          src={getImageUrl(post.imageUrl || post.image)}
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-900 bg-gray-100 px-2 py-1 rounded">
            {post.category}
          </span>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <Link to={`/blog/${post._id}`}>
          <h3 className="text-xl font-medium text-gray-900 group-hover:text-black transition-colors mb-3 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm"
              src={getImageUrl(post.author?.avatar) || "/placeholder.svg"}
              alt={post.author?.name}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{post.author?.name}</p>
              <div className="flex items-center text-gray-500 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>5 min read</span>
              </div>
            </div>
          </div>

          <StatsBar />
        </div>
      </div>
    </motion.article>
  )
}

export default BlogArticle
