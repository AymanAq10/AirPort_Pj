import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminForm } from './Admin';

export default function Setting() {

  const [AdminData, setAdminData] = useState([]);

  const AdminId = window.location.search.split('=')[1];


  // this function for fetch all admin data
    // inputs => admin id
    // outputs => object contains amin data : {Fname: '', Lname: '', Acc_email: '', Tele: '', _Password: ''}
  useEffect(() => {
    
    axios.get(`http://localhost:8000/api/Admin-D/${AdminId}`)
    .then(data => setAdminData(data.data))

  }, []);

  // this function for update admin data
    // inputs => array of admin data : [Fname, Lname, Email, Thel, Password]
    // outputs => ???
  function UpdateData(obj, newPassword) {
    if (newPassword !== obj[0]['password']) {

      if (newPassword) {
        obj[0]['password'] = newPassword; 
      };

      axios.put(`http://localhost:8000/api/Admins/${AdminId}`, obj)
      .finally(() => alert('Updated successfully!'))


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