import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import blogReducer from "../redux/blog/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer
  }
});

export default store;
