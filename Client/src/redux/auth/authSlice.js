import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateUserProfile } from "../../store/service/auth/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/signin`, data, {
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Login failed");
    }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/signup`, data, {
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Registration failed");
    }
});

export const fetchUserData = createAsyncThunk("auth/fetchUserData", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/user`, {
            withCredentials: true
        });
        return {
            user: res.data.user,
            blogs: res.data.blogs || []
        };
    } catch (err) {
        if (err.response?.status === 401 || err.response?.data?.error === "Unauthorized") {
            thunkAPI.dispatch(logout());
        }
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch user data");
    }
});

export const saveProfile = createAsyncThunk("auth/saveProfile", async (formData, thunkAPI) => {
    try {
        const res = await updateUserProfile(formData)
        return res
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to update profile")
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        userBlogs: [],
        loading: false,
        error: null,
        showWelcome: true
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.userBlogs = [];
            state.showWelcome = true;
        },
        disableWelcome: (state) => {
            state.showWelcome = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
                state.showWelcome = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
                state.showWelcome = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.userBlogs = action.payload.blogs || [];
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload === "Unauthorized") {
                    state.user = null;
                    state.userBlogs = [];
                }
            })
            .addCase(saveProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(saveProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
            })
            .addCase(saveProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            });
    }
});

export const { logout, disableWelcome, clearError } = authSlice.actions;
export default authSlice.reducer;