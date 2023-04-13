import './style.css';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Buffer } from 'buffer';


const Signup = () => {

    const Display = useSelector(state => state.SignUpReducer.ToggleSignUp);

    useEffect(() => {
        document.getElementById('chk').checked = Display;
    }, [Display]);

    function AddStagiaire(e) {
        e.preventDefault();

        const formData = new FormData(e.target)

        const FirstName = formData.get('fname')
        const LastName  = formData.get('lname')
        const Domain    = formData.get('domain')
        const Thel      = formData.get('tel')
        const CIN       = formData.get('CIN')
        const Email     = formData.get('email')
        const Password  = formData.get('pswd')
        const CPass     = formData.get('cpswd')
        // const ProfilePic = 'Images/Profile.png'
        // const ProfileUrl = Buffer.from(ProfilePic).toString('base64');
        if (FirstName && LastName && Domain && Thel && CIN && Email && Password && CPass) {
            if (Password === CPass) {
                
                const loadingBtn2 = document.querySelector('.loadingBtn2')
                loadingBtn2.innerHTML = '<i class="fa-solid ZaSpinner fa-link"></i> <span class="loading">Loading<span class="dots"><span></span><span></span><span></span></span></span>'
                setTimeout(() => {
                    axios.post('http://localhost:8000/api/Stagires', {
                                'Fname'         : FirstName,
                                'Lname'         : LastName,
                                'Domain'        : Domain,
                                '_Number'       : Thel,
                                'Acc_email'     : Email,
                                'CIN'           : CIN,
                                '_Password'     : Password,
                                'ImageProfile'  : 'ProImg'
                            })
                                
                          .then(data => {
                                if (data.data.message) {
                                    alert(data.data.message)
                                }
                                else{
                                    window.location.href = `/Account?id=${data.data}`
                                }
                            })
                          .finally(() => {
                            loadingBtn2.innerHTML = 'Sign Up'})
                }, 500);          

            } else {
                alert("Wrong Password!");
            }
        } else {
            alert('Fill the empty fields!');
        }
    };

    return (
        <div className="login69">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <form onSubmit={AddStagiaire}>
                
                <label htmlFor="chk" aria-hidden="true">Sign up</label>

                <input className='Inputs' type="text"     name="fname"     placeholder="First Name"     required />
                <input className='Inputs' type="text"     name="lname"     placeholder="Last Name"      required />
                <input className='Inputs' type="text"     name="tel"       placeholder="Number"         required />
                <input className='Inputs' type="email"    name="email"     placeholder="Email"          required />
                <input className='Inputs' type="text"     name="CIN"       placeholder="CIN"            required />
                <input className='Inputs' type="text"     name="domain"    placeholder="Domain"         required />
                <input className='Inputs' type="password" name="pswd"      placeholder="Password"       required />
                <input className='Inputs' type="password" name="cpswd"     placeholder="ConfirmPassword"required />

                <button id='SignUp' className='loadingBtn2' type='submit'>Sign Up</button>
            </form>
        </div>
    )
}
export default Signup;