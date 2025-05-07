// CreateBlogForm.jsx
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ImageIcon, X, FileText, User, ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"

const CreateBlogForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 10 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setPreviewImage(reader.result)
      reader.readAsDataURL(file)
    } else {
      toast.error("Image must be less than 10MB")
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    setPreviewImage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Blog post data:", formData)
      toast.success("Blog post published successfully!")
      navigate("/profile")
    } catch (error) {
      toast.error("Failed to publish blog post.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex items-center">
          <button
            onClick={() => navigate("/profile")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-black">Create New Blog Post</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative w-full bg-gray-100">
            {previewImage ? (
              <div className="relative">
                <img src={previewImage} alt="Featured" className="w-full h-64 object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-black bg-opacity-70 rounded-full p-2 text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-64 w-full cursor-pointer hover:bg-gray-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full border-b-2 border-gray-300 focus:border-black py-3 text-lg font-medium"
                  placeholder="Enter blog title"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full border-b-2 border-gray-300 focus:border-black py-3 text-base"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-black resize-none"
                  placeholder="Brief description..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlogForm
