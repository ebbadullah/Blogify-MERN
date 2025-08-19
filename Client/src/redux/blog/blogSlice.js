import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBlogs,
  createNewBlog,
  getSingleBlog,
  deleteBlogById,
  updateBlogById
} from "../../store/service/blog/api";

export const fetchBlogs = createAsyncThunk("blog/fetchAll", async () => {
  return await getAllBlogs();
});

export const createBlog = createAsyncThunk("blog/create", async (formData) => {
  return await createNewBlog(formData);
});

export const fetchBlogById = createAsyncThunk("blog/fetchById", async (id) => {
  return await getSingleBlog(id);
});

export const updateBlog = createAsyncThunk("blog/update", async ({ id, formData }) => {
  return await updateBlogById(id, formData);
});

export const deleteBlog = createAsyncThunk("blog/delete", async (id) => {
  await deleteBlogById(id);
  return id;
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    selectedBlog: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload.blog);
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((b) => b._id === action.payload.blog._id);
        if (index !== -1) state.blogs[index] = action.payload.blog;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      });
  }
});

export default blogSlice.reducer;