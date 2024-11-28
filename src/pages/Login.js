import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store';  // Import store
import './style.css';  



const Login = () => {
  const [account, setAccount] = useState('');  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { userLogin, login } = useUserStore();  // Lấy dữ liệu từ store

  const handleLogin = () => {

    if (!account || !password) {
      setError('Vui lòng nhập tài khoản và mật khẩu');
      return;
    }
    const user = userLogin.find((user) => user.account === account && user.password === password); 
    //Hàm find tìm kiếm trong mảng userLogin một đối tượng có thuộc tính account trùng lặp
    
    if (user) {
      login(user);
      localStorage.setItem('token', JSON.stringify(user)); // Lưu token vào localStorage as JSON

      navigate('/datatable');  // điều hướng đến trang datatable
    } else {
      setError('Tài khoản, mật khẩu không hợp lệ');  
    }
  };

  return (
    <div className="login-container">
      <p> Đăng nhập</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label className="form-label-login">Tài khoản:</label>
      <input
        className='input-login'
        type="text"
        placeholder="Tài khoản"
        value={account}  
        onChange={(e) => setAccount(e.target.value)}
      />
      <label className="form-label-login">Mật khẩu:</label>
      <input
       className='input-login'
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn-login" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
