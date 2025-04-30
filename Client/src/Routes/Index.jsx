import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import BlogPage from "../pages/BlogPage"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"
import Layout from "../components/Layout"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="auth" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
