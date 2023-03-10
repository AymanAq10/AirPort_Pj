import React from 'react';
import { FiMenu } from 'react-icons/fi';

import { useDispatch } from 'react-redux';

export default function Section({ Content }) {

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
          {Content ? Content : <img src="./Images/nodata.png" className='DefaultContent' />}
        </div>
      </div>
    </div>
  );
};