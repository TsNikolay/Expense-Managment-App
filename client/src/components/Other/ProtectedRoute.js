import React, { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
