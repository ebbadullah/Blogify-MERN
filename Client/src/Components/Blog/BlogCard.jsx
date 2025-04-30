const BlogCard = ({ post }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
        <img className="w-full h-48 object-cover object-center" src={post.image || "/placeholder.svg"} alt={post.title} />
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className="bg-black text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
              {post.category}
            </span>
            <span className="ml-2 text-gray-500 text-sm">{post.date}</span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-black hover:text-gray-700 transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full mr-4"
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
            />
            <div>
              <p className="text-sm font-medium text-black">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.readTime} min read</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default BlogCard
  