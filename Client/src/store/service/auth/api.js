import axios from "axios"

const BASE_URL = "http://localhost:5000"

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