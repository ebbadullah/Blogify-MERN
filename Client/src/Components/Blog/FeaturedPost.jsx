const FeaturedPost = ({ post }) => {
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Featured Post</h3>
        <img
          className="w-full h-48 object-cover object-center rounded-md mb-4"
          src={post.image || "/placeholder.svg"}
          alt={post.title}
        />
        <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
        <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full mr-3"
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
          />
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-gray-400">{post.readTime} min read</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
