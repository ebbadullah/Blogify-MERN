"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Edit, Calendar, Eye, MessageSquare, BookOpen } from "lucide-react"

const ProfilePage = () => {
  // In a real app, you would fetch this data from an API
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Profile Image */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white">
              <img
                src={user.profileImage || "https://via.placeholder.com/150"}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.name || "User Name"}</h1>
              <p className="text-gray-300 mt-1">{user.email || "user@example.com"}</p>
              <p className="mt-4 max-w-2xl">{user.bio || "No bio available. Click edit profile to add your bio."}</p>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-center px-4 py-2 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">{posts.length}</div>
                  <div className="text-sm text-gray-300">Posts</div>
                </div>
                <div className="text-center px-4 py-2 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">4,012</div>
                  <div className="text-sm text-gray-300">Views</div>
                </div>
                <div className="text-center px-4 py-2 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">35</div>
                  <div className="text-sm text-gray-300">Comments</div>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-6 md:mt-0 md:ml-auto">
              <Link
                to="/edit-profile"
                className="inline-flex items-center px-4 py-2 border border-white rounded-md text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-black">My Blog Posts</h2>
          <Link
            to="/create-blog"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300"
          >
            Create New Post
          </Link>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No posts yet</h3>
            <p className="mt-2 text-gray-500">Get started by creating your first blog post.</p>
            <div className="mt-6">
              <Link
                to="/create-blog"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300"
              >
                Create New Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        to={`/edit-blog/${post.id}`}
                        className="text-black hover:text-gray-700 transition-colors duration-300"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
