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
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      setIsAuthenticated(!!token)
      setLoading(false)
    }

    checkAuth()

    window.addEventListener("storage", checkAuth)

    window.addEventListener("authChange", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
      window.removeEventListener("authChange", checkAuth)
    }
  }, [])

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
        <AppRoutes isAuthenticated={true} />
      ) : (
        <AppRoutes isAuthenticated={false} />
      )}
    </Router>
  )
}

export default App
