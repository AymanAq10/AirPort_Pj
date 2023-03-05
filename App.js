import React from 'react';

import AdminPage from './AdminPage/AdminPage';
import UserPage from './Home_login-Signup/UserPage';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<UserPage/>} />
      <Route path='/AdminPage' element={<AdminPage/>} />
    </Routes>
  );
};