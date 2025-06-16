import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.tipo_de_usuario;

    if (allowedRoles.includes(userRole)) {
      return children;
    } else {
      return <Navigate to="/login" replace />;
    }
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;