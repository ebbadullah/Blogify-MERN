import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import BlogPage from "../pages/BlogPage"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"
import ProfilePage from "../components/Profile/ProfilePage"
import CreateBlogForm from "../components/Blog/CreateBlogForm"
import Layout from "../components/Layout"
import WelcomePage from "../Pages/WelcomePage"

const AppRoutes = ({ isAuthenticated = true }) => {
  return (
    <Routes>
      {/* Auth route - accessible even when not logged in */}
      <Route path="/auth" element={<LoginPage />} />

      {!isAuthenticated ? (
        // Routes for non-authenticated users
        <>
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        // Routes for authenticated users
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create-blog" element={<CreateBlogForm />} />
          <Route path="edit-blog/:id" element={<CreateBlogForm />} />
        </Route>
      )}
    </Routes>
  )
}

export default AppRoutes
