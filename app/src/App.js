import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 
import WeatherDisplay from './components/WeatherDisplay';
import ProfileSettings from './components/ProfileSettings';
import AlertsPage from './components/AlertsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather/:city" element={<WeatherDisplay />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/alerts' element={<AlertsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

// PrivateRoute component to protect weather pages

export default App;
