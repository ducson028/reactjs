import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store';  
import './login.css';  
import { AiFillEye, AiFillEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'; 
import { FaFacebook, FaYoutube, FaInstagramSquare, FaTwitter } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';

const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { userLogin, login, isAuthenticated } = useUserStore();

  // Điều hướng nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    if (!account || !password) {
      setError('Vui lòng nhập tài khoản và mật khẩu');
      return;
    }
    const user = userLogin.find(
      (user) => user.account === account && user.password === password
    );
    
    if (user) {
      login(user);
      navigate('/');
    } else {
      setError('Tài khoản hoặc mật khẩu không hợp lệ');
    }
  };

  return (
    <div className="login-container">
      <p className="dangnhap">Đăng nhập</p>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <input
        className="input-login"
        type="text"
        placeholder="Tài khoản"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <div className="password-wrapper">
        <input
          className="input-login"
          type={showPassword ? "text" : "password"}
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && (
          <span
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        )}
      </div>
      <button className="btn-login" onClick={handleLogin}>
        <GoArrowRight />
      </button>
      <div>
        <p className="or">or Login with</p>
      </div>
      <div className="password-logo">
        <a href="https://www.facebook.com/">
          <FaFacebook />
        </a>
        <a href="https://www.google.com.vn/">
          <AiOutlineGoogle />
        </a>
        <a href="https://www.youtube.com/">
          <FaYoutube />
        </a>
        <a href="https://x.com/">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/">
          <FaInstagramSquare />
        </a>
      </div>
    </div>
  );
};

export default Login;
