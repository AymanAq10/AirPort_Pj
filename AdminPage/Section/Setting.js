import React, { useEffect, useState } from 'react';
import { AdminForm } from './Admin';

export default function Setting() {

  const [AdminData, setAdminData] = useState([]);

  const AdminId = window.location.search.split('=')[1];


  // this function for fetch all admin data
    // inputs => admin id
    // outputs => object contains amin data : {Fname: '', Lname: '', Email: '', Thel: '', Password: ''}
  useEffect(() => {

    fetch("http://localhost/airport-Project/src/BackEnd/Admin.php", {
      method: 'POST', body: new URLSearchParams([['type', 'GetAdmin'], ['Adminid', AdminId]])
    })
      .then(resp => resp.json())
      .then(data => setAdminData(data));

  }, []);

  // this function for update admin data
    // inputs => array of admin data : [Fname, Lname, Email, Thel, Password]
    // outputs => ???
  function UpdateData(obj, newPassword) {
    if (newPassword !== obj[4]) {

      if (newPassword) {
        obj[4] = newPassword;
      };

      fetch('http://localhost/airport-Project/src/BackEnd/Admin.php', {
        method: "POST", body: new URLSearchParams([['type', 'UpdateAdmin'],
          ['ArrData', JSON.stringify(obj)]])
      });
    } else {
      alert('The Password Not Valide!');
    };
  };

  return (
    <div id='SettingPage'>
      <h2>Admin Id: {AdminId}</h2>
      <AdminForm data={AdminData} update={UpdateData} />
    </div>
  );
};