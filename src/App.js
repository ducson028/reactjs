// src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoute from './AppRoute';
import { UserProvider } from './context/UserContext';
function App() {
  return (
    <UserProvider>
      <Router>
      <Header />
        <AppRoute />  
      <Footer />
    </Router>
    </UserProvider>
  );
}

export default App;
