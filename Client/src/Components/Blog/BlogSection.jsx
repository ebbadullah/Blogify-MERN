import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import BlogArticle from "../../Components/Blog/BlogArticle.jsx"
import CategoryNav from "./CategoryNav"
import { fetchBlogs } from "../../redux/blog/blogSlice"

const BlogSection = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")
    const [visiblePosts, setVisiblePosts] = useState(9)
    const scrollRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    const { blogs, loading } = useSelector((state) => state.blog)

    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [0, -50])

    const categories = ["All", ...new Set(blogs.map((post) => post.category))]

    const filteredPosts = blogs.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.description?.toLowerCase().includes(searchQuery.toLowerCase()) || post.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = activeCategory === "All" || post.category === activeCategory
        return matchesSearch && matchesCategory
    })

    const featuredPost = blogs.find((post) => post.featured) || blogs[0]

    const loadMorePosts = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 9)
    }

    return (
        <section ref={scrollRef} className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div style={{ y }} className="mb-16 max-w-4xl">
                    <h2 className="text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">Insights & Ideas</h2>
                    <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">Discover thought-provoking articles on web development, design, and technology from our expert writers.</p>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-[300px] pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 shadow-sm" />
                        </div>

                        <CategoryNav categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                    </div>
                </motion.div>

                {!searchQuery && activeCategory === "All" && blogs.length > 1 && (
                    <div className="mb-24">
                        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">Trending Now</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.slice(1, 4).map((post) => (
                                <div key={post._id}>
                                    <BlogArticle post={post} variant="standard" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-16">
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">{searchQuery || activeCategory !== "All" ? "Search Results" : "Latest Articles"}</h3>

                    {loading ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                <p className="text-gray-500 text-lg">Loading articles...</p>
                            </div>
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.slice(0, visiblePosts).map((post) => (
                                    <div key={post._id}>
                                        <BlogArticle post={post} variant="standard" />
                                    </div>
                                ))}
                            </div>

                            {visiblePosts < filteredPosts.length && (
                                <div className="text-center mt-12">
                                    <motion.button onClick={loadMorePosts} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-300 shadow-lg">Load More Articles</motion.button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 pt-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-4xl font-serif font-bold text-gray-900 mb-4">Stay in the loop</h3>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">Subscribe to our newsletter for the latest articles, insights, and updates delivered straight to your inbox.</p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input type="email" placeholder="Your email address" className="flex-grow px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 shadow-sm" />
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-6 py-4 bg-black text-white font-medium rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 shadow-lg">
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