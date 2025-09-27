import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (data) => {
    const res = await axios.post(`${BASE_URL}/api/signin`, data, { withCredentials: true })
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`${BASE_URL}/api/signup`, data, { withCredentials: true })
    return res.data
}

export const getUserData = async () => {
    const res = await axios.get(`${BASE_URL}/api/user`, { withCredentials: true })
    return res.data
}

export const updateUserProfile = async (formData) => {
    const res = await axios.put(`${BASE_URL}/api/user`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
    })
    return res.data
}

export const searchUsersApi = async (q) => {
    const res = await axios.get(`${BASE_URL}/api/users/search`, { params: { q }, withCredentials: true })
    return res.data
}

export const getPublicUserProfileApi = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/users/${id}`, { withCredentials: true })
    return res.data
}