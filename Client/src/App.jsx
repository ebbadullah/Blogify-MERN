"use client"

import { BrowserRouter as Router } from "react-router-dom"
import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./Routes/Index"

import "./index.css"
import Loader from "./Components/UI/Loader"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      setIsAuthenticated(!!token)
      setLoading(false)
    }

    checkAuth()

    // Listen for storage events (for when token is added/removed in another tab)
    window.addEventListener("storage", checkAuth)

    // Custom event for auth changes within the same tab
    window.addEventListener("authChange", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
      window.removeEventListener("authChange", checkAuth)
    }
  }, [])

  // Show loader while checking authentication
  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "#22c55e",
            },
          },
          error: {
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
      {isAuthenticated ? (
        // Show full app with all routes when authenticated
        <AppRoutes isAuthenticated={true} />
      ) : (
        // Show welcome page with auth options when not authenticated
        <AppRoutes isAuthenticated={false} />
      )}
    </Router>
  )
}

export default App
