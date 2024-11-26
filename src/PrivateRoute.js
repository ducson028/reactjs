import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from './store';  // Import Zustand store

// PrivateRoute Component để bảo vệ các route yêu cầu xác thực
const PrivateRoute = ({ children }) => {
  const { currentUser } = useUserStore();  // Lấy currentUser từ Zustand store

  return currentUser ? children : <Navigate to="/" />;  // Chuyển hướng về trang login nếu chưa đăng nhập
};

export default PrivateRoute;
