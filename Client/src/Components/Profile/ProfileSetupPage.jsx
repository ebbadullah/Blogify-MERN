"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { saveProfile } from "../../redux/auth/authSlice"

const ProfileSetupPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const [avatarFile, setAvatarFile] = useState(null)
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [website, setWebsite] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const formData = new FormData()
      if (avatarFile) formData.append("avatar", avatarFile)
      if (bio) formData.append("bio", bio)
      if (location) formData.append("location", location)
      if (website) formData.append("website", website)
      if (dateOfBirth) formData.append("dateOfBirth", dateOfBirth)

      await dispatch(saveProfile(formData)).unwrap()
      toast.success("Profile set up successfully!")
      navigate("/")
    } catch (err) {
      toast.error(err || "Failed to set up profile")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-black text-white py-12 relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl font-bold font-serif"
          >
            Complete your profile
          </motion.h1>
          <p className="text-gray-300 mt-2">This helps others know you better.</p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={user?.name || ""}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black/50"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black/50"
              placeholder="Tell us about yourself"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black/50"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black/50"
              placeholder="https://your-site.com"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            type="submit"
            className={`px-6 py-3 rounded-full text-white bg-black hover:bg-gray-800 ${submitting ? "opacity-70" : ""}`}
          >
            {submitting ? "Saving..." : "Save and continue"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}

export default ProfileSetupPage
