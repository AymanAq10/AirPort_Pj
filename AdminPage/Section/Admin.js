import React, { useEffect, useState } from 'react';

export default function Admin() {
  return (
    <div>
      
    </div>
  );
};

export function AdminForm({ data, update }) {

    const [FirstName, setFirstName] = useState(data.Fname);
    const [LastName, setLastName] = useState(data.Lname);
    const [Email, setEmail] = useState(data.Acc_email);
    const [Thel, setThel] = useState(data.Tele);
    const [Password, setPassowrd] = useState(data.Tele);
    const [NewPassword, setNewPassword] = useState('');
    const [FormData, setFormData] = useState([]);

    useEffect(() => {
        const AdminId = window.location.search.split('')[4];
        setFormData([FirstName, LastName, Thel, Email, Password, AdminId]);
    }, [FirstName, LastName, Thel, Email, Password]);

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
                <input type="password" name="Password" id='Password' value={Password}
                    onChange={(e) => setPassowrd(e.target.value)} placeholder='Old Password'/>
            </div>
            <div>
                <label htmlFor="CPassword">Nouveau Password</label>
                <input type="password" name="CPassword" id='CPassword' value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password'/>
            </div>
            <button type="button" id='UpdateData' onClick={() => update(FormData, NewPassword)}>Valide</button>
          </form>
    );
}