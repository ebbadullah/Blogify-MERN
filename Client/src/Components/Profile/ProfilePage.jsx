"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Edit,
  Calendar,
  Eye,
  MessageSquare,
  BookOpen,
  Share2,
  Heart,
  Bookmark,
  Settings,
  PlusCircle,
} from "lucide-react"
import AnimatedSection from "../UI/AnimatedSection"
import { fadeIn, staggerContainer} from "../../Utils/motion" 

const ProfilePage = () => {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("posts")

  useEffect(() => {
    // Get user data from localStorage (in a real app, you would fetch from API)
    try {
      const userData = JSON.parse(localStorage.getItem("user")) || {}
      setUser(userData)

      // Simulate fetching posts (replace with actual API call)
      setTimeout(() => {
        setPosts([
          {
            id: 1,
            title: "Getting Started with React",
            excerpt: "Learn the basics of React and how to create your first component.",
            date: "May 15, 2023",
            readTime: "5 min read",
            views: 1240,
            comments: 8,
            likes: 42,
            saved: true,
            image:
              "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          },
          {
            id: 2,
            title: "CSS Grid vs Flexbox",
            excerpt: "Understanding when to use CSS Grid and when to use Flexbox for layouts.",
            date: "April 28, 2023",
            readTime: "8 min read",
            views: 950,
            comments: 12,
            likes: 36,
            saved: false,
            image:
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          },
          {
            id: 3,
            title: "JavaScript Promises Explained",
            excerpt: "A deep dive into JavaScript Promises and async/await syntax.",
            date: "March 10, 2023",
            readTime: "10 min read",
            views: 1820,
            comments: 15,
            likes: 78,
            saved: true,
            image:
              "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80",
          },
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error loading user data:", error)
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-serif">Loading your profile...</div>
        </div>
      </div>
    )
  }

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0)
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Background with Gradient Overlay */}
      <div className="relative bg-black text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="show"
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            {/* Profile Image with Animation */}
            <motion.div variants={fadeIn("right", 0.2)} className="relative">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/80 shadow-xl">
                <img
                  src={
                    user.profileImage ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                  }
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-black"></div>
            </motion.div>

            {/* Profile Info */}
            <motion.div variants={fadeIn("up", 0.3)} className="md:flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold">{user.name || "Alex Johnson"}</h1>
              <p className="text-gray-300 mt-2 text-lg">{user.email || "alex.johnson@example.com"}</p>

              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                {user.location && <span className="px-3 py-1 bg-white/10 rounded-full text-sm">{user.location}</span>}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    {user.website.replace(/(^\w+:|^)\/\//, "")}
                  </a>
                )}
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  Joined {user.joinDate || "January 2023"}
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed">
                {user.bio ||
                  "Creative developer with a passion for building beautiful user interfaces and writing about web technologies. I love sharing my knowledge and experiences with the community."}
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">{posts.length}</div>
                  <div className="text-sm text-gray-300">Posts</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">{totalViews.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Views</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">{totalComments}</div>
                  <div className="text-sm text-gray-300">Comments</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">{totalLikes}</div>
                  <div className="text-sm text-gray-300">Likes</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeIn("left", 0.4)} className="flex flex-col space-y-3 md:items-end">
              <Link
                to="/edit-profile"
                className="inline-flex items-center px-5 py-2.5 border border-white/30 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
              <Link
                to="/settings"
                className="inline-flex items-center px-5 py-2.5 border border-white/30 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "posts", label: "My Posts", icon: <BookOpen className="h-5 w-5" /> },
              { id: "saved", label: "Saved", icon: <Bookmark className="h-5 w-5" /> },
              { id: "drafts", label: "Drafts", icon: <Edit className="h-5 w-5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } transition-colors duration-300`}
              >
                <span
                  className={`mr-2 ${activeTab === tab.id ? "text-black" : "text-gray-400 group-hover:text-gray-500"}`}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Create New Post Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            {activeTab === "posts" ? "My Blog Posts" : activeTab === "saved" ? "Saved Posts" : "Draft Posts"}
          </h2>
          <Link
            to="/create-blog"
            className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Post
          </Link>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <AnimatedSection className="text-center py-16 bg-white rounded-xl shadow-sm">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-6 text-xl font-serif font-medium text-gray-900">No posts yet</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Get started by creating your first blog post and share your knowledge with the world.
            </p>
            <div className="mt-8">
              <Link
                to="/create-blog"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New Post
              </Link>
            </div>
          </AnimatedSection>
        ) : (
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeIn("up", 0.1 * index)}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Action buttons that appear on hover */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 rounded-full text-black hover:bg-white transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full text-black hover:bg-white transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full text-black hover:bg-white transition-colors">
                      {post.saved ? <Bookmark className="h-4 w-4 fill-current" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-5 line-clamp-2">{post.excerpt}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className={`h-4 w-4 mr-1 ${post.likes > 50 ? "text-red-500 fill-red-500" : ""}`} />
                        <span>{post.likes}</span>
                      </div>
                    </div>

                    <Link
                      to={`/edit-blog/${post.id}`}
                      className="text-black hover:text-gray-700 transition-colors duration-300"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
