import AuthGate from "./AuthGate"


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token")

    if (!isAuthenticated) {
        return <AuthGate />
    }

    return children
}

export default ProtectedRoute
