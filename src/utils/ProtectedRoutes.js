import React, { useContext } from 'react'
import { authStore } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
    const {auth}=useContext(authStore)
    console.log(auth);

 if(auth){
   return <Outlet/>
 }
 else{
    return <Navigate to={"/login"}/>
 }

}

export default ProtectedRoutes
