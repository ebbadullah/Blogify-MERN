import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import AuthGate from "./AuthGate"

const FirstVisitCheck = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const [showAuthGate, setShowAuthGate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    if (user) {
      navigate("/")
    } else if (!hasVisited) {
      setShowAuthGate(true)
    }
    setHasVisited(true)
    setLoading(false)
  }, [user, hasVisited, navigate])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (showAuthGate) {
    return (
      <AuthGate
        onContinue={() => {
          setShowAuthGate(false)
          navigate("/")
        }}
      />
    )
  }

  return null
}

export default FirstVisitCheck