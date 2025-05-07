"use client"

import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import Footer from "../Footer"
import AuthGate from "../Auth/AuthGate"
import Navbar from "../Navbar/Index"

const Layout = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [location])

  // Special case: if we're on the auth page, we don't need to check authentication
  const isAuthPage = location.pathname === "/auth" || location.pathname.includes("/auth?mode=")

  // If not authenticated and not on auth page, show AuthGate
  if (!isAuthenticated && !isAuthPage) {
    // Don't show AuthGate for public pages
    const publicPages = ["/", "/blogs", "/about", "/contact"]
    if (!publicPages.includes(location.pathname)) {
      return <AuthGate />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
