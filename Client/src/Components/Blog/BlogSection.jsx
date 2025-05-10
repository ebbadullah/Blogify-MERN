"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import BlogArticle from "../Blog/BlogArticle.jsx"
import FeaturedArticle from "../Blog/FeaturedArticle.jsx"
import CategoryNav from "./CategoryNav"

const BlogSection = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const scrollRef = useRef(null)

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2023",
      excerpt:
        "Explore the latest trends and technologies shaping the future of web development. From WebAssembly to Edge Computing, discover what's next.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      category: "Technology",
      date: "Apr 12, 2023",
      readTime: 5,
      featured: true,
      author: {
        name: "Lina Fatima",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4D03AQHHFhfsVcHNJA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698611108124?e=2147483647&v=beta&t=F3OKjPhn6qV4_G75Tm2efIjqQfwnzB8S5u4APRhYJvE",
      },
    },
    {
      id: 2,
      title: "Mastering React Hooks: A Comprehensive Guide",
      excerpt:
        "Learn how to leverage React Hooks to write cleaner, more efficient code. This guide covers everything from useState to custom hooks.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "React",
      date: "Mar 28, 2023",
      readTime: 8,
      featured: false,
      author: {
        name: "Muhammad Ismail",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4D03AQEnUw11W3ZTMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728170985458?e=2147483647&v=beta&t=bvIWa91h3XcqKgFaGwbhbRXg_T2HjbXxAlKa2ladDp0",
      },
    },
    {
      id: 3,
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt:
        "Discover how to create beautiful, responsive user interfaces using Tailwind CSS. This tutorial walks you through the utility-first approach.",
      image:
        "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "CSS",
      date: "Mar 15, 2023",
      readTime: 6,
      featured: false,
      author: {
        name: "Ali Nisar",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4E03AQGpUVRwomxQhA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692849556097?e=2147483647&v=beta&t=vjFAv9XieuNvP0AsaTxmjQ3DQVskeM1DL4TBHjAQZN0",
      },
    },
    {
      id: 4,
      title: "The Psychology of User Experience Design",
      excerpt:
        "Understanding how users think and behave is crucial for creating effective digital experiences. Explore the psychological principles behind great UX design.",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "UX/UI",
      date: "Mar 5, 2023",
      readTime: 7,
      featured: false,
      author: {
        name: "Sarah Ahmed",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    },
    {
      id: 5,
      title: "Optimizing Web Performance: A Deep Dive",
      excerpt:
        "Learn advanced techniques to improve your website's loading speed and overall performance. From code splitting to lazy loading, this guide covers it all.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      category: "Performance",
      date: "Feb 20, 2023",
      readTime: 9,
      featured: false,
      author: {
        name: "Hamza Khan",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    },
  ]

  // Get all unique categories
  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))]

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || post.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Get featured post
  const featuredPost = blogPosts.find((post) => post.featured)

  // Scroll the trending section
  const trendingRef = useRef(null)
  const scrollTrending = (direction) => {
    if (trendingRef.current) {
      const { scrollLeft, clientWidth } = trendingRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      trendingRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  return (
    <section ref={scrollRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with parallax effect */}
        <motion.div style={{ y }} className="mb-16 max-w-3xl">
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Insights & Ideas</h2>
          <p className="text-xl text-gray-600 mb-8 font-light">
            Discover thought-provoking articles on web development, design, and technology from our expert writers.
          </p>

          {/* Search and categories */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-b-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300"
              />
            </div>

            <CategoryNav
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </motion.div>

        {/* Featured Article - Full Width */}
        {featuredPost && !searchQuery && activeCategory === "All" && (
          <div className="mb-24">
            <FeaturedArticle post={featuredPost} />
          </div>
        )}

        {/* Trending Articles - Horizontal Scroll */}
        {!searchQuery && activeCategory === "All" && (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Trending Now</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollTrending("left")}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollTrending("right")}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              ref={trendingRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {blogPosts.slice(1, 5).map((post) => (
                <div key={post.id} className="min-w-[280px] md:min-w-[350px]">
                  <BlogArticle post={post} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Articles - Magazine Layout */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">
            {searchQuery || activeCategory !== "All" ? "Search Results" : "Latest Articles"}
          </h3>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16">
              {filteredPosts.map((post, index) => {
                // Create a magazine-style layout with varied sizes
                const isLarge = index % 5 === 0
                const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4"

                return (
                  <div key={post.id} className={`${colSpan}`}>
                    <BlogArticle post={post} variant={isLarge ? "large" : "standard"} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Stay in the loop</h3>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for the latest articles, insights, and updates delivered straight to your
              inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-black transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-black text-white font-medium flex items-center justify-center"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
