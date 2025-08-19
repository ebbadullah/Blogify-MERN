import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, clearError } from "../../redux/auth/authSlice";
import AnimatedSection from "../UI/AnimatedSection";
import Loader from "../UI/Loader";
import { fadeIn, staggerContainer } from "../../Utils/motion";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, userBlogs, loading, error } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("posts");

  // Fetch user data on mount
  useEffect(() => {
    // dispatch(fetchUserData());
    return () => dispatch(clearError());
  }, [dispatch]);

  // Dummy arrays for saved/draft blogs
  const savedBlogs = [];
  const draftBlogs = [];

  const currentPosts =
    activeTab === "posts"
      ? userBlogs
      : activeTab === "saved"
      ? savedBlogs
      : draftBlogs;

  const totalViews =
    userBlogs?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;
  const totalComments =
    userBlogs?.reduce((sum, post) => sum + (post.comments?.length || 0), 0) || 0;
  const totalLikes =
    userBlogs?.reduce((sum, post) => sum + (post.likes || 0), 0) || 0;

  const [timeoutError, setTimeoutError] = useState(false);
  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => setTimeoutError(true), 10000);
    } else {
      setTimeoutError(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Use Loader component for loading state
  if (loading && !timeoutError) {
    return <Loader />;
  }

  if (error || timeoutError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl font-serif text-red-500">
          {error || "Failed to load profile. Please check your connection or try again."}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-black text-white rounded"
          onClick={() => {
            dispatch(clearError());
            dispatch(fetchUserData());
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl font-serif text-gray-500">User not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Background with Gradient Overlay */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="show"
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            {/* Profile Image */}
            <motion.div variants={fadeIn("right", 0.2)} className="relative">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/80 shadow-xl">
                <img
                  src={
                    user?.profileImage ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                  }
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-black"></div>
            </motion.div>
            {/* Profile Info */}
            <motion.div
              variants={fadeIn("up", 0.3)}
              className="md:flex-1 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold">
                {user?.name || "User"}
              </h1>
              <p className="text-gray-300 mt-2 text-lg">
                {user?.email || "user@example.com"}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                {user?.location && (
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {user.location}
                  </span>
                )}{" "}
                {user?.website && (
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
                  Joined{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })
                    : "Recently"}
                </span>
              </div>
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed">
                {user?.bio || "Welcome to my blog profile"}
              </p>
              {/* Stats */}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">
                    {userBlogs?.length || 0}
                  </div>
                  <div className="text-sm text-gray-300">Posts</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">
                    {totalViews.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Views</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">
                    {totalComments}
                  </div>
                  <div className="text-sm text-gray-300">Comments</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <div className="text-3xl font-serif font-bold">
                    {totalLikes}
                  </div>
                  <div className="text-sm text-gray-300">Likes</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeIn("left", 0.4)}
              className="flex flex-col space-y-3 md:items-end"
            >
              <Link
                to="/edit-profile"
                className="inline-flex items-center px-5 py-2.5 border border-white/30 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Edit className="h-4 w-4 mr-2" /> Edit Profile{" "}
              </Link>

              <Link
                to="/settings"
                className="inline-flex items-center px-5 py-2.5 border border-white/30 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" /> Settings{" "}
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
                  className={`mr-2 ${
                    activeTab === tab.id
                      ? "text-black"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
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
            {activeTab === "posts"
              ? "My Blog Posts"
              : activeTab === "saved"
              ? "Saved Posts"
              : "Draft Posts"}
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
        {currentPosts?.length === 0 ? (
          <AnimatedSection className="text-center py-16 bg-white rounded-xl shadow-sm">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-6 text-xl font-serif font-medium text-gray-900">
              {activeTab === "posts"
                ? "No posts yet"
                : activeTab === "saved"
                ? "No saved posts"
                : "No drafts"}
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {activeTab === "posts"
                ? "Get started by creating your first blog post and share your knowledge with the world."
                : activeTab === "saved"
                ? "Save interesting posts to view them later."
                : "Your draft posts will appear here."}
            </p>
            {activeTab === "posts" && (
              <div className="mt-8">
                <Link
                  to="/create-blog"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create New Post
                </Link>
              </div>
            )}
          </AnimatedSection>
        ) : (
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentPosts?.map((post, index) => (
              <motion.div
                key={post._id || index}
                variants={fadeIn("up", 0.1 * index)}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={
                      post.imageUrl?.startsWith("/")
                        ? `http://localhost:5000${post.imageUrl}`
                        : post.imageUrl || "/placeholder.svg"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Action buttons on hover */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/edit-blog/${post._id}`}
                      className="p-2 bg-white/90 rounded-full text-black hover:bg-white transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="p-2 bg-white/90 rounded-full text-black hover:bg-white transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full text-black hover:bg-white transition-colors">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>
                      {Math.ceil(post.description?.length / 1000) || 1} min read
                    </span>
                  </div>
                  <Link to={`/blog/${post._id}`}>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-5 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{post.views?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.comments?.length || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart
                          className={`h-4 w-4 mr-1 ${
                            post.likes > 50 ? "text-red-500 fill-red-500" : ""
                          }`}
                        />
                        <span>{post.likes || 0}</span>
                      </div>
                    </div>
                    <Link
                      to={`/edit-blog/${post._id}`}
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
  );
};

export default ProfilePage;