import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
import useUserStore from '../../store';

const Header = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const handleLogout = () => {
    
    // Hiển thị thông báo xác nhận khi người dùng nhấn "Logout"
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất không?');
    
    if (confirmLogout) {
      logout();
      // Điều hướng về trang chủ nếu người dùng chọn "OK"
      navigate('/');
    }
  };
  
  return (
    <header>
      <section className="header">
        <div className="logo">
          <p onClick={() => {
          navigate('/data')}}
      >Admin Dashboard</p>
        </div>
        <div className="menu">
          <button a className="btn-primary">Home</button>
          <button className="btn-primary">Users</button>
          <button className="btn-primary">Settings</button>
          <button className="btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </section>
    </header>
  );
};

export default Header;