import React from 'react';

import AdminPage from './AdminPage/AdminPage';
import UserPage from './Home_Login_Signup_with_api/UserPage';
import Stagiaire from './AdminPage/Section/Stagiaire';
import Requests from './AdminPage/Section/Requests';
import RequestAccepte from './AdminPage/Section/RequestAccepte';
import Home from './Home_Login_Signup_with_api/Home_page/Home';
import LoginsignUp from './Home_Login_Signup_with_api/Home_page/login_signup/login_Signup';
import Setting from './AdminPage/Section/Setting';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserPage Element={<Home />} />}/>
          <Route path='/Signup' element={<UserPage Element={<LoginsignUp />}/>}/>
          <Route path='/Login' element={<UserPage Element={<LoginsignUp />}/>}/>
        <Route path='/AdminPage' element={<AdminPage />}/>
          <Route path='/AdminPage/StagiaireData' element={<AdminPage Element={<Stagiaire />} />}/>
          <Route path='/AdminPage/Requests' element={<AdminPage Element={<Requests />} />}/>
          <Route path='/AdminPage/AcceptedRequests' element={<AdminPage Element={<RequestAccepte />} />}/>
          <Route path='/AdminPage/updatedata' element={<AdminPage Element={<Setting />} />}/>
      </Routes>
    </Router>
  );
};