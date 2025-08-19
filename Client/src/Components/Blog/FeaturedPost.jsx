"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const FeaturedPost = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-xl shadow-lg"
    >
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover object-center"
          src={post.image || "/placeholder.svg"}
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
      </div>

      <div className="relative p-6 md:p-8">
        {/* Featured badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm mb-4">
          <span className="animate-pulse mr-2 h-2 w-2 bg-white rounded-full"></span>
          Featured Post
        </div>

        <Link to={`/blog/${post._id}`}>
          <h4 className="text-xl md:text-2xl font-bold mb-3 text-white hover:text-gray-200 transition-colors duration-300">
            {post.title}
          </h4>
        </Link>

        <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Date and read time */}
        <div className="flex items-center text-gray-300 text-sm mb-5">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{post.date}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime} min read</span>
        </div>

        {/* Author info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-white"
              src={post.author?.avatar || "/placeholder.svg"}
              alt={post.author?.name}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{post.author?.name}</p>
            </div>
          </div>

          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link
              to={`/blog/${post._id}`}
              className="inline-flex items-center text-white hover:text-gray-200 transition-colors duration-300"
            >
              Read more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default FeaturedPost