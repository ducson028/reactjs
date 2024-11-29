import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store';  

function PrivateRoute({ children }) {
  const { isAuthenticated } = useUserStore(); 

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    return <Navigate to="/" />;
  }

  return children; // Nếu đã đăng nhập, render component con
}

export default PrivateRoute;
