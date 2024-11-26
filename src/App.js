// src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoute from './AppRoute';

function App() {
  return (
    <Router>
      <Header />
        <AppRoute />  
      <Footer />
    </Router>
  );
}

export default App;
