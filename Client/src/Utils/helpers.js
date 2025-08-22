export const API_BASE = "http://localhost:5000"

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg"
  if (imagePath.startsWith("http")) return imagePath
  if (imagePath.startsWith("/")) return `${API_BASE}${imagePath}`
  return imagePath
}

export const formatDate = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatNumber = (num) => {
  const n = Number(num || 0)
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return (n / 1000).toFixed(1) + "K"
  return n.toString()
}



