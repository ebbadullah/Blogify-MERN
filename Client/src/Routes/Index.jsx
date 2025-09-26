import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import BlogPage from "../pages/BlogPage"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"
import ProfilePage from "../components/Profile/ProfilePage"
import EditProfilePage from "../components/Profile/EditProfilePage"
import CreateBlogForm from "../components/Blog/CreateBlogForm"
import ProfileSetupPage from "../Components/Profile/ProfileSetupPage"
import Layout from "../components/Layout"
import WelcomePage from "../Pages/WelcomePage"
import BlogDetails from "../Components/Blog/BlogDetails"
import UserProfilePage from "../Pages/UserProfilePage"

const AppRoutes = () => {
    const isAuthenticated = useSelector((state) => state.auth.user !== null)

    return (
        <Routes>
            <Route path="/auth" element={<LoginPage />} />

            {!isAuthenticated ? (
                <>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            ) : (
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="blogs" element={<BlogPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="setup-profile" element={<ProfileSetupPage />} />
                    <Route path="edit-profile" element={<EditProfilePage />} />
                    <Route path="blog/:id" element={<BlogDetails />} />
                    <Route path="user/:id" element={<UserProfilePage />} />

                    <Route path="create-blog" element={<CreateBlogForm />} />
                    <Route path="edit-blog/:id" element={<CreateBlogForm />} />
                </Route>
            )}
        </Routes>
    )
}

export default AppRoutes