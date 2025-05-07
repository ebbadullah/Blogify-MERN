"use client"

import { useEffect } from "react"
import toast from "react-hot-toast"
import BlogSection from "../components/Blog/BlogSection"

const HomePage = () => {
  useEffect(() => {
    // Check if we should show the welcome toast (only after login/signup)
    const shouldShowWelcomeToast = localStorage.getItem("showWelcomeToast")

    if (shouldShowWelcomeToast) {
      // Get user data from JWT token
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      const userName = userData.name || "User"

      // Show welcome toast
      toast.success(
        <div className="flex flex-col">
          <span className="font-bold">Welcome, {userName}!</span>
          <span className="text-sm">You're successfully logged in</span>
        </div>,
        {
          icon: "👋",
          duration: 5000,
        },
      )

      // Remove the flag so toast doesn't show again on page refresh
      localStorage.removeItem("showWelcomeToast")
    }
  }, [])

  return (
    <div>
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Welcome to Blogify</span>
              <span className="block text-gray-300 mt-2">A Modern Blogging Platform</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <div className="mt-10 sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                >
                  Get Started
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-gray-900 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogSection />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">Join Our Newsletter</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Get the latest articles, resources, and updates directly in your inbox.
            </p>
          </div>
          <div className="mt-8 max-w-md mx-auto">
            <form className="mt-3 sm:flex">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              We care about your data. Read our{" "}
              <a href="#" className="font-medium text-black hover:text-gray-800 transition-colors duration-300">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
