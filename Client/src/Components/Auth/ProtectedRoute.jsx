import AuthGate from "./AuthGate"

// This component checks if the user is authenticated
// If not, it shows the AuthGate component instead of the requested page
const ProtectedRoute = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = !!localStorage.getItem("token")

  // If not authenticated, show AuthGate
  if (!isAuthenticated) {
    return <AuthGate />
  }

  // If authenticated, show the requested page
  return children
}

export default ProtectedRoute
