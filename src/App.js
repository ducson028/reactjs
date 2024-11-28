// src/App.js

import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoute from './components/Route/AppRoute';
import { UserProvider } from './context/UserContext';
function App() {
  
  return (
    <Router>
    <UserProvider>
      <AppWithHeaderFooter />
    </UserProvider>
    </Router>
  );
}

function AppWithHeaderFooter() {
  const location = useLocation();
  const isLogin = location.pathname === '/'; // Kiểm tra xem có phải trang đăng nhập không

  return (
    <div>
      {/* Chỉ render Header và Footer nếu không phải trang đăng nhập */}
      {!isLogin && <Header />}
      <AppRoute />
      {!isLogin && <Footer />}
    </div>
  );
}

export default App;
