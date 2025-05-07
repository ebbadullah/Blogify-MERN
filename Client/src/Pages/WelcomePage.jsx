import { Link } from "react-router-dom"
import { ArrowRight, Users, BookOpen, TrendingUp, Star, MessageSquare } from "lucide-react"

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navbar for Welcome Page - without login/signup buttons */}
      <nav className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-bold text-xl tracking-tight">BLOGIFY</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced with background image */}
      <section className="relative bg-black text-white py-24 sm:py-32">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight font-extrabold sm:text-6xl md:text-7xl">
              <span className="block">Welcome to Blogify</span>
              <span className="block text-gray-300 mt-2">A Modern Blogging Platform</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
              Discover stories, thinking, and expertise from writers on any topic. Join our community of creators and
              readers today.
            </p>
            <div className="mt-10 sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <Link
                  to="/auth?mode=signup"
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors duration-300"
                >
                  Join Now
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/auth"
                  className="w-full flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-gray-900 transition-colors duration-300"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-4xl font-bold text-black">10K+</p>
              <p className="text-gray-600 mt-2">Active Users</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-4xl font-bold text-black">50K+</p>
              <p className="text-gray-600 mt-2">Blog Posts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-4xl font-bold text-black">100+</p>
              <p className="text-gray-600 mt-2">Countries</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-4xl font-bold text-black">1M+</p>
              <p className="text-gray-600 mt-2">Monthly Views</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with icons */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">Why Choose Blogify?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to create, publish, and grow your blog.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-black text-center">Easy to Use</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Our intuitive interface makes it simple to create and manage your blog posts. No technical skills
                  required.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-black text-center">Global Reach</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Share your ideas with readers from around the world and build your audience.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-black text-center">Analytics & Growth</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Track your performance with detailed analytics and grow your readership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Join thousands of satisfied bloggers on our platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Sarah Johnson"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">Sarah Johnson</h3>
                  <div className="flex text-yellow-400">
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Blogify has transformed the way I share my travel experiences. The platform is so easy to use, and I've
                connected with readers from all over the world!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="David Chen"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">David Chen</h3>
                  <div className="flex text-yellow-400">
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a tech blogger, I needed a platform that could handle code snippets and technical content. Blogify
                exceeded my expectations with its powerful editor and clean design."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Maria Rodriguez"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">Maria Rodriguez</h3>
                  <div className="flex text-yellow-400">
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I started my food blog on Blogify last year, and I've already gained over 10,000 followers! The
                analytics tools have been invaluable for understanding what my audience enjoys."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">Featured Blogs</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Explore some of our most popular content.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                className="w-full h-48 object-cover"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                alt="Blog post"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-black text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                    Technology
                  </span>
                  <span className="ml-2 text-gray-500 text-sm">Apr 12, 2023</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">The Future of Web Development in 2023</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Explore the latest trends and technologies shaping the future of web development. From WebAssembly to
                  Edge Computing, discover what's next.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Author"
                    />
                    <span className="text-sm text-gray-700">Alex Johnson</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>24 comments</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                className="w-full h-48 object-cover"
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Blog post"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-black text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                    React
                  </span>
                  <span className="ml-2 text-gray-500 text-sm">Mar 28, 2023</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Mastering React Hooks: A Comprehensive Guide</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Learn how to leverage React Hooks to write cleaner, more efficient code. This guide covers everything
                  from useState to custom hooks.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Author"
                    />
                    <span className="text-sm text-gray-700">Samantha Lee</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>18 comments</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                className="w-full h-48 object-cover"
                src="https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Blog post"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-black text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                    CSS
                  </span>
                  <span className="ml-2 text-gray-500 text-sm">Mar 15, 2023</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Building Responsive UIs with Tailwind CSS</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Discover how to create beautiful, responsive user interfaces using Tailwind CSS. This tutorial walks
                  you through the utility-first approach.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/men/67.jpg"
                      alt="Author"
                    />
                    <span className="text-sm text-gray-700">David Chen</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>32 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to start blogging?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-300">
                  Join thousands of writers who have already started their journey with Blogify. It's free to get
                  started!
                </p>
                <Link
                  to="/auth?mode=signup"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-black hover:bg-gray-200 transition-all duration-300"
                >
                  Get started today
                  <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-bold text-xl tracking-tight">BLOGIFY</span>
              </div>
              <p className="text-gray-400 mb-4">
                A modern platform for writers and readers to connect through engaging content. Share your stories,
                ideas, and expertise with the world.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Blogify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WelcomePage
