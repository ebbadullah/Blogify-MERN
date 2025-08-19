"use client"

import { Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Footer from "../Footer"
import AuthGate from "../Auth/AuthGate"
import Navbar from "../Navbar/Index"

const Layout = () => {
  const location = useLocation()
  const user = useSelector((state) => state.auth.user)

  const isAuthPage =
    location.pathname === "/auth" || location.pathname.startsWith("/auth?mode=")

  // Public pages allowed without login
  const publicPages = ["/", "/blogs", "/about", "/contact"]

  const isPublicPage = publicPages.includes(location.pathname)

  if (!user && !isAuthPage && !isPublicPage) {
    return <AuthGate />
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
