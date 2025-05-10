"use client"

import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"
import { Link } from "react-router-dom"

const BlogArticle = ({ post, variant = "standard" }) => {
  // Different layouts based on variant
  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group"
      >
        <Link to={`/blog/${post.id}`} className="block relative aspect-[4/3] overflow-hidden mb-4">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
            src={post.image}
            alt={post.title}
          />
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-900">{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span className="text-xs text-gray-500">{post.readTime} min read</span>
        </div>

        <Link to={`/blog/${post.id}`}>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>

        <div className="flex items-center">
          <img
            className="h-6 w-6 rounded-full object-cover"
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
          />
          <span className="ml-2 text-xs text-gray-600">{post.author.name}</span>
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
        className="group"
      >
        <Link to={`/blog/${post.id}`} className="block relative aspect-[16/9] overflow-hidden mb-6">
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            src={post.image}
            alt={post.title}
          />
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-1 bg-gray-100 text-xs font-medium uppercase tracking-wider text-gray-900">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
        </div>

        <Link to={`/blog/${post.id}`}>
          <h3 className="text-3xl font-serif font-bold text-gray-900 group-hover:text-black transition-colors mb-4 leading-tight">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-5 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <div className="flex items-center text-gray-500 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <Link
            to={`/blog/${post.id}`}
            className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-0.5 hover:border-black hover:text-black transition-colors"
          >
            Read Article
          </Link>
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
      className="group"
    >
      <Link to={`/blog/${post.id}`} className="block relative aspect-[3/2] overflow-hidden mb-5">
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
          src={post.image}
          alt={post.title}
        />
      </Link>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-900">{post.category}</span>
        <span className="h-1 w-1 rounded-full bg-gray-400"></span>
        <span className="text-xs text-gray-500">{post.date}</span>
      </div>

      <Link to={`/blog/${post.id}`}>
        <h3 className="text-xl font-medium text-gray-900 group-hover:text-black transition-colors mb-3 line-clamp-2">
          {post.title}
        </h3>
      </Link>

      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

      <div className="flex items-center">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={post.author.avatar || "/placeholder.svg"}
          alt={post.author.name}
        />
        <div className="ml-2">
          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default BlogArticle
