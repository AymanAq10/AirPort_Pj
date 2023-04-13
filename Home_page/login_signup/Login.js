import axios from 'axios';
import { useState } from 'react';

import './style.css';

const Login = () => {

    const InputStyles = {
        inputEmail: { margin: ' 16px auto', padding: '20px' },
        inputPassword : { margin: ' 16px auto', padding: '20px' }
    };

    function Check_Login(e) {
        e.preventDefault();

        const formData = new FormData(e.target)

        const loadingBtn = document.querySelector('.loadingBtn')
        loadingBtn.innerHTML = '<i class="fa-solid ZaSpinner fa-link"></i> <span class="loading">Loading<span class="dots"><span></span><span></span><span></span></span></span>'
        
        axios.post('http://localhost:8000/api/Authentification', {'Email': formData.get('Email'),'Password': formData.get('Password')} )
        .then(data =>{
                    if (data.data[0] === 'Admin') {
                        window.location.href = `http://localhost:3000/AdminPage?id=${data.data[1]}`;
                        console.log(data);
                    } else if (data.data[0] === 'Stagiaire') {
                        window.location.href = `http://localhost:3000/Account?id=${data.data[1]}`;
                    } else {
                        alert('Email or password is incorrect!')
                    }
                } )

        .finally(() => {       
            loadingBtn.innerHTML = 'Login'
        })
    }

    return (
        <div className="signup69">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <form onSubmit={Check_Login} >
                <label htmlFor="chk" aria-hidden="true">Login</label>
                <input style={InputStyles.inputEmail} type="text" name="Email" placeholder="Email" required />
                <input style={InputStyles.inputPassword} type="password" name="Password" placeholder="Password" required />
                <button className='loadingBtn' type='submit'> Login</button>
            </form>
        </div>
    )
}
export default Login;