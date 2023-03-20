import React, { useEffect, useRef } from 'react';
import { FiMenu } from 'react-icons/fi';

import { useDispatch } from 'react-redux';

export default function Section({ Content }) {

  const dispatch = useDispatch();

  const FullName = useRef();

  const AdminId = window.location.search.split('=')[1];

  // this function for show the admin full name
    // inputs => admin id
    // outputs => Admin First Name and Last Name
  useEffect(() => {
    fetch("http://localhost/airport-Project/src/BackEnd/Admin.php", {
      method: 'POST', body: new URLSearchParams([['type', 'GetAdmin'], ['Adminid', AdminId]])
    })
      .then(resp => resp.json())
      .then(data => {
        FullName.current.textContent = `${data.Fname} ${data.Lname}`;
      });
  }, []);

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
          <h2 ref={FullName}></h2>
        </div>
        <div>
          {Content ? Content : <img src="./Images/nodata.png" className='DefaultContent' />}
        </div>
      </div>
    </div>
  );
};