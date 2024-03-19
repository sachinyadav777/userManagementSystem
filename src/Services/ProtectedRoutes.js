import React from 'react'
import { Outlet, Navigate } from 'react-router'
const ProtectedRoutes = () => {

    const Auth = JSON.parse(localStorage.getItem("user"))
    const newAuth = JSON.parse(localStorage.getItem("newuser"))
    if (!Auth || !newAuth) {
        return <Navigate to={"/"} />
    } 
    const Authcheck = Auth.filter((key, value) => {
        console.log(key.email)
        return key.email === newAuth.email && key.number === newAuth.number;
    })

    return Authcheck.length > 0 ? <Outlet /> : <Navigate to={"/"} />;


}

export default ProtectedRoutes