import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

import { useDispatch } from 'react-redux';

import Stagiaire from './Stagiaire';
import Requests from './Requests';

import { Route, Routes} from 'react-router-dom';

export default function Section() {

  const dispatch = useDispatch();

  function ShowMenu() {
    dispatch({type: 'Toggle', payload: true});
  };

  return (
    <div id='Section'>
      <div onClick={ShowMenu}>
        <FiMenu />
      </div>
      <div id='container'>
        <div>
          <h1>Full Name</h1>
        </div>
        <div>
          <Routes>
            <Route exact path='/' element={<img src="./Images/nodata.png" className='DefaultContent' />}/>
            <Route path='/StagiaireData' element={<Stagiaire />}/>
            <Route path='/Requests' element={<Requests />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};