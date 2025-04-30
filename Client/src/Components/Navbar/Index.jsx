"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import Logo from "./Logo"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white"
              >
                Home
              </Link>
              <Link
                to="/blogs"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white"
              >
                Blogs
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-white"
              >
                Contact
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
              />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                to="/auth"
                className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/auth?mode=signup"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-all duration-300"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
              Home
            </Link>
            <Link to="/blogs" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
              Blogs
            </Link>
            <Link to="/about" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
              Contact
            </Link>
          </div>

          {/* Mobile Search */}
          <div className="px-2 py-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm"
              />
            </div>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="px-2 py-3 flex space-x-3">
            <Link
              to="/auth"
              className="w-1/2 flex justify-center items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=signup"
              className="w-1/2 flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-all duration-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
