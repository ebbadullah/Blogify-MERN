"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthGate from "./AuthGate"

const FirstVisitCheck = () => {
  const [loading, setLoading] = useState(true)
  const [showAuthGate, setShowAuthGate] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")
    const isAuthenticated = !!localStorage.getItem("token")

    if (!hasVisitedBefore && !isAuthenticated) {
      // First visit and not authenticated, show AuthGate
      setShowAuthGate(true)
    } else {
      // Not first visit or already authenticated, mark as visited
      localStorage.setItem("hasVisitedBefore", "true")
      setShowAuthGate(false)
    }

    setLoading(false)
  }, [navigate])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (showAuthGate) {
    return (
      <AuthGate
        onContinue={() => {
          // Mark as visited when they click through
          localStorage.setItem("hasVisitedBefore", "true")
          navigate("/")
          window.location.reload() // Force reload to update the UI
        }}
      />
    )
  }

  // If not showing AuthGate, return null so the normal app renders
  return null
}

export default FirstVisitCheck
