import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/ReactToastify.min.css';

import { ProfilePage } from 'modules/user';
import { LoginPage, RegisterPage } from 'modules/auth';

const App = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/profile" />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
