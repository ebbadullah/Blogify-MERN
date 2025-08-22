"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUserData } from "../../redux/auth/authSlice"

const AuthBootstrap = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
    return null
}

export default AuthBootstrap



