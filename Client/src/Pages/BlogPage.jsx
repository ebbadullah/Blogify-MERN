import BlogSection from "../components/Blog/BlogSection"

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Blog</h1>
          <p className="mt-4 text-lg text-gray-300">
            Insights, thoughts, and expertise from our writers on web development, design, and technology.
          </p>
        </div>
      </div>

      <BlogSection />
    </div>
  )
}

export default BlogPage
