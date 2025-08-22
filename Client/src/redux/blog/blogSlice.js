import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllBlogs,
    createNewBlog,
    getSingleBlog,
    deleteBlogById,
    updateBlogById,
    likeBlogById,
    readBlogById,
    getBlogComments,
    addBlogComment,
    deleteBlogComment
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

export const likeBlog = createAsyncThunk("blog/like", async (id) => {
    return await likeBlogById(id); // { message, liked, blog }
});

export const readBlog = createAsyncThunk("blog/read", async (id) => {
    return await readBlogById(id); // blog
});

export const fetchComments = createAsyncThunk("blog/fetchComments", async (id) => {
    return { id, comments: await getBlogComments(id) };
});

export const addComment = createAsyncThunk("blog/addComment", async ({ id, text }) => {
    return { id, ...(await addBlogComment(id, text)) }; // { message, comments }
});

export const removeComment = createAsyncThunk("blog/removeComment", async ({ id, commentId }) => {
    return { id, ...(await deleteBlogComment(id, commentId)) }; // { message, comments }
});

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        selectedBlog: null,
        commentsByBlogId: {},
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
            })
            .addCase(likeBlog.fulfilled, (state, action) => {
                const updated = action.payload.blog;
                const idx = state.blogs.findIndex((b) => b._id === updated._id);
                if (idx !== -1) state.blogs[idx] = updated;
                if (state.selectedBlog?._id === updated._id) state.selectedBlog = updated;
            })
            .addCase(readBlog.fulfilled, (state, action) => {
                const updated = action.payload;
                const idx = state.blogs.findIndex((b) => b._id === updated._id);
                if (idx !== -1) state.blogs[idx] = updated;
                if (state.selectedBlog?._id === updated._id) state.selectedBlog = updated;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { id, comments } = action.payload;
                state.commentsByBlogId[id] = comments;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { id, comments } = action.payload;
                state.commentsByBlogId[id] = comments;
                if (state.selectedBlog?._id === id) {
                    state.selectedBlog = { ...state.selectedBlog, comments: comments.length };
                }
            })
            .addCase(removeComment.fulfilled, (state, action) => {
                const { id, comments } = action.payload;
                state.commentsByBlogId[id] = comments;
                if (state.selectedBlog?._id === id) {
                    state.selectedBlog = { ...state.selectedBlog, comments: comments.length };
                }
            });
    }
});

export default blogSlice.reducer;