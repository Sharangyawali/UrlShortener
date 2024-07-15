import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthComponent = () => {
    const authorization = localStorage.getItem("authorization");
    const expiry=localStorage.getItem("expiry");
    console.log(expiry);
    const expiryDate=new Date(expiry)
    const currentDate=new Date()
    console.log(expiryDate);
    console.log(currentDate);
  return authorization&&expiryDate>currentDate ? <Navigate to='/' /> : <Outlet/>;
};

export default AuthComponent;
