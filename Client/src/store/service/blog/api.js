// store/service/blog/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getAllBlogs = async () => {
  const res = await axios.get(`${BASE_URL}/api/blogs`, { withCredentials: true });
  return res.data;
};

export const createNewBlog = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/blogs`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const getSingleBlog = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/blogs/${id}`, { withCredentials: true });
  return res.data;
};

export const updateBlogById = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/api/blogs/${id}`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const deleteBlogById = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/blogs/${id}`, { withCredentials: true });
  return res.data;
};

// 🔹 Fetch all categories from backend
export const getAllCategories = async () => {
  const res = await axios.get(`${BASE_URL}/api/categories`, { withCredentials: true });
  return res.data; // should return ["Tech", "Lifestyle", ...]
};

// 🔹 Blog actions
export const likeBlogById = async (id) => {
  const res = await axios.post(`${BASE_URL}/api/blogs/${id}/like`, {}, { withCredentials: true });
  return res.data; // { message, liked, blog }
};

export const readBlogById = async (id) => {
  const res = await axios.post(`${BASE_URL}/api/blogs/${id}/read`, {}, { withCredentials: true });
  return res.data; // blog
};

// 🔹 Comments APIs
export const getBlogComments = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/blogs/${id}/comments`, { withCredentials: true });
  return res.data; // comments array
};

export const addBlogComment = async (id, text) => {
  const res = await axios.post(
    `${BASE_URL}/api/blogs/${id}/comments`,
    { text },
    { withCredentials: true }
  );
  return res.data; // { message, comments }
};

export const deleteBlogComment = async (id, commentId) => {
  const res = await axios.delete(`${BASE_URL}/api/blogs/${id}/comments/${commentId}`, { withCredentials: true });
  return res.data; // { message, comments }
};