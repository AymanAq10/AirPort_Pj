import './style.css';
import { useEffect, useState } from "react";

import { useSelector } from 'react-redux';

const Signup = () => {

    const Display = useSelector(state => state.SignUpReducer.ToggleSignUp);

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Domain, setDomain] = useState('');
    const [Thel, setThel] = useState('');
    const [CIN, setCIN] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [CPass, setCPass] = useState('');

    const [FormData, setFormData] = useState([]);

    useEffect(()=> {
        setFormData([FirstName, LastName, Domain, Thel, Email, CIN, Password]);
    },[FirstName, LastName, Domain, Thel, Email, CIN, Password]);

    useEffect(() => {
        document.getElementById('chk').checked = Display;
    }, [Display]);

    // this function for insert one stagiaire
        // inputs => array of stagiaire data : [FirstName, LastName, Domain, Thel, Email, CIN, Password]
        // outputs => stagiaire id
    function AddStagiaire(e) {
        e.preventDefault();
        if (FirstName && LastName && Domain && Thel && CIN && Email && Password && CPass) {
            if (Password === CPass) {

                fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
                    method: "POST", body: new URLSearchParams([['type', 'AddStagiaire'],
                    ['Sta_Data', JSON.stringify(FormData)]])
                });

                setTimeout(() => {
                    fetch("http://localhost/airport-Project/src/BackEnd/Login.php", {
                        method: 'POST', body: new URLSearchParams([['Email', Email], ['Password', Password]])
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            window.location.href = `/Account?id=${data[0].Acc_id}`;
                        });
                }, 1000);

            } else {
                alert("the password not valide !");
            }
        } else {
            alert('Some inputs empty !');
        }
    };

    return (
        <div className="login69">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <form>
                <label htmlFor="chk" aria-hidden="true">Sign up</label>
                <input className='Inputs' type="text" name="fname" placeholder="First Name"
                    required value={FirstName} onChange={e => setFirstName(e.target.value)} />
                <input className='Inputs' type="text" name="lname" placeholder="Last Name"
                    required value={LastName} onChange={e => setLastName(e.target.value)} />
                <input className='Inputs' type="text" name="tel" placeholder="Number"
                    required value={Thel} onChange={e => setThel(e.target.value)} />
                <input className='Inputs' type="email" name="email" placeholder="Email"
                    required value={Email} onChange={e => setEmail(e.target.value)} />
                <input className='Inputs' type="text" name="CIN" placeholder="CIN"
                    required value={CIN} onChange={e => setCIN(e.target.value)} />
                <input className='Inputs' type="text" name="domain" placeholder="Domain"
                    required value={Domain} onChange={e => setDomain(e.target.value)} />
                <input className='Inputs' type="password" name="pswd" placeholder="Password"
                    required value={Password} onChange={e => setPassword(e.target.value)} />
                <input className='Inputs' type="password" name="pswd" placeholder="ConfirmPassword"
                    required value={CPass} onChange={e => setCPass(e.target.value)} />
                <button id='SignUp' onClick={AddStagiaire}><i></i>Sign up</button>
            </form>
        </div>
    )
}
export default Signup;