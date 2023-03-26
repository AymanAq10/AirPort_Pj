import './style.css';

const Login = () => {
    const InputStyles = {
        inputEmail: { margin: ' 16px auto', padding: '20px' },
        inputPassword : { margin: ' 16px auto', padding: '20px' }
    };

    function Check_Login(e) {
        e.preventDefault();

        const data = new URLSearchParams();
        for (let item of new FormData(document.forms[0])) {
            data.append(item[0], item[1]);
        };

        // this function for login
            // inputs => Email and Password
            // outputs => admin id or stagiaire id
        fetch('http://localhost/airport-Project/src/BackEnd/Login.php', {
            method: 'POST', body: data
        })
            .then(resp => resp.json())
            .then(data => {
                if (data[1] === 'Admin') {
                    window.location.href = `http://localhost:3000/AdminPage?id=${data[0].AdminId}`;
                } else if (data[1] === 'Stagiaire') {
                    window.location.href = `http://localhost:3000/Account?id=${data[0].Acc_id}`;
                } else {
                    alert('this account not found')
                }
            });
    }

    return (
        <div className="signup69">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <form>
                <label htmlFor="chk" aria-hidden="true">Login</label>
                <input style={InputStyles.inputEmail} type="text" name="Email" placeholder="Email" required />
                <input style={InputStyles.inputPassword} type="password" name="Password" placeholder="Password" required />
                <button onClick={Check_Login}>Login</button>
            </form>
        </div>
    )
}
export default Login;