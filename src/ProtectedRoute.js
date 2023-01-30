import React, { Children } from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./components/useAuth";

const ProtectedRoute = () => {
    const {auth} = useAuth();
    let location = useLocation();
    console.log(auth)
    return !auth?.user_name ? <Navigate to="/login"  state={{from:location}} replace/> : <Outlet/>     
};

export default ProtectedRoute;