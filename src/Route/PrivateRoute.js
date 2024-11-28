import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../../store';  // Giả sử bạn dùng store để lưu thông tin người dùng

function PrivateRoute({ children }) {
  const { isAuthenticated } = useUserStore(); // Giả sử là store lưu thông tin xác thực người dùng

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    return <Navigate to="/" />;
  }

  return children; // Nếu đã đăng nhập, render component con
}

export default PrivateRoute;
