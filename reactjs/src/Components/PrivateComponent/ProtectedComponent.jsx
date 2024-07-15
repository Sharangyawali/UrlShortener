import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedComponent = () => {
    const authorization = localStorage.getItem("authorization");
    const expiry=localStorage.getItem("expiry");
    const expiryDate=new Date(expiry)
    const currentDate=new Date()
  return authorization&&expiryDate>currentDate ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedComponent;
