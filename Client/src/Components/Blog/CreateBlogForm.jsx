"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImageIcon, X, FileText, User, ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { createBlog, fetchBlogById, updateBlog } from "../../redux/blog/blogSlice"
import RichTextEditor from "../UI/TextEditor"

const CreateBlogForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const { loading: blogLoading } = useSelector((state) => state.blog)
  const [previewImage, setPreviewImage] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    image: null,
  })

  // If editing, load blog details
  useEffect(() => {
    const load = async () => {
      if (id) {
        const action = await dispatch(fetchBlogById(id))
        const blog = action.payload
        if (blog) {
          setFormData({
            title: blog.title || "",
            author: blog.author?.name || "",
            description: blog.description || "",
            category: blog.category || "",
            image: null,
          })
          setPreviewImage(blog.imageUrl || null)
        }
      }
    }
    load()
  }, [id, dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be less than 10MB")
        return
      }
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file")
        return
      }
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setPreviewImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    setPreviewImage(null)
  }

  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }
    if (!formData.author.trim()) {
      toast.error("Author name is required")
      return
    }
    if (!formData.category.trim()) {
      toast.error("Category is required")
      return
    }
    if (!formData.description.trim() || formData.description === "<p><br></p>") {
      toast.error("Blog content is required")
      return
    }
    if (!id && !formData.image) {
      toast.error("Featured image is required")
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append("title", formData.title.trim())
    formDataToSend.append("author", formData.author.trim())
    formDataToSend.append("description", formData.description.trim())
    formDataToSend.append("category", formData.category.trim())
    formDataToSend.append("image", formData.image)

    try {
      if (id) {
        const resultAction = await dispatch(updateBlog({ id, formData: formDataToSend }))
        if (updateBlog.fulfilled.match(resultAction)) {
          toast.success("Blog updated successfully!")
          navigate(`/blog/${id}`)
        } else {
          throw new Error(resultAction.payload || "Failed to update blog")
        }
      } else {
        const resultAction = await dispatch(createBlog(formDataToSend))
        if (createBlog.fulfilled.match(resultAction)) {
          toast.success("Blog published successfully!")
          navigate("/blogs")
        } else {
          throw new Error(resultAction.payload || "Failed to publish blog")
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{id ? "Edit Blog Post" : "Create New Blog Post"}</h1>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Featured Image Upload */}
          <div className="relative bg-gray-100 h-64 w-full">
            {previewImage ? (
              <div className="relative h-full w-full">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Featured preview"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-10 block w-full border-b-2 border-gray-300 focus:border-black py-3 text-lg font-medium placeholder-gray-400 focus:outline-none"
                  placeholder="Blog title"
                  required
                />
              </div>

              {/* Author */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="pl-10 block w-full border-b-2 border-gray-300 focus:border-black py-3 text-base placeholder-gray-400 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-black focus:ring-black- sm:text-sm"
                  placeholder="Technology, Travel, Food, etc."
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content</label>
                <RichTextEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Write your blog content here..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={blogLoading}
                className={`w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                  blogLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {blogLoading ? "Publishing..." : "Publish Blog"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlogForm
