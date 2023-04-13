import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {


    function AddAdmin(data) {
        axios.post('http://localhost:8000/api/Admins', data)
        .then(data => { 
            if (data.data.success === true) {
                alert("Added successfully!")
            }
            else{
                alert("Error the account wasn't added!")

            }
        })
    };

  return (
    <div id='SettingPage'>
      <AdminForm newLabel='Comfermer Password' add={AddAdmin} />
    </div>
  );
};

export function AdminForm({ data, update, newLabel, add}) {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Thel, setThel] = useState('');
    const [Password, setPassowrd] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [FormData, setFormData] = useState([]);

    useEffect(() => {
        const AdminId = window.location.search.split('')[4];
        setFormData([{'Fname': FirstName,'Lname': LastName,'Tele': Thel,'Email': Email,'password': Password}]);
    }, [FirstName, LastName, Thel, Email, Password]);

    useEffect(() => {
        if (data) {
            setFirstName(data.Fname);
            setLastName(data.Lname);
            setEmail(data.Acc_email);
            setThel(data.Tele);
            setPassowrd(data._Password);
        };
    }, [data]);

    const ToogleFunctions = () => {
        if (add) {
            add(FormData);
        } else {
            update(FormData, NewPassword);
        };
    };

    const ChangeLabel = () => {
        if (newLabel) {
            return newLabel;
        } else {
            return 'Nouveau Password';
        };
    };

    return (
        <form id='AdminForm'>
            <div>
                <label htmlFor="FirstName">Prenom</label>
                <input type="text" name="FirstName" id='FirstName' 
                    onChange={(e) => setFirstName(e.target.value)} value={FirstName}/>
            </div>
            <div>
                <label htmlFor="LastName">nom</label>
                <input type="text" name="LastName" id='LastName' 
                    onChange={(e) => setLastName(e.target.value)} value={LastName}/>
            </div>
            <div>
                <label htmlFor="Thel">Telephone</label>
                <input type="text" name="Thel" id='Thel' 
                    onChange={(e) => setThel(e.target.value)} value={Thel}/>
            </div>
            <div>
                <label htmlFor="Email">Email</label>
                <input type="email" name="Email" id='Email' 
                    onChange={(e) => setEmail(e.target.value)} value={Email}/>
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <input type="text" name="Password" id='Password' value={Password}
                    onChange={(e) => setPassowrd(e.target.value)} disabled/>
            </div>
            <div>
                <label htmlFor="CPassword">{ChangeLabel()}</label>
                <input type="text" name="CPassword" id='CPassword' value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}  />
            </div>
            <button type="button" id='UpdateData' onClick={ToogleFunctions}>Valide</button>
          </form>
    );
}