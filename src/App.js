import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import DevicesList from './components/DeviceList';
import DeviceDetails from './components/DeviceDetails';
import Login from './components/Login';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/devices" element={isAuthenticated ? <DevicesList /> : <Navigate to="/" />} />
        <Route path="/devices/:id" element={isAuthenticated ? <DeviceDetails /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;