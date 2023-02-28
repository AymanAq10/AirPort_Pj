import './style.css';
const Login = ()=>{
    return(
        <div class="signup">
		<input type="checkbox" id="chk" aria-hidden="true" />
        <form>
            <label for="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" required/>
            <input type="password" name="pswd" placeholder="Password" required />
            <button><i></i>Login</button>
        </form>
    </div>
    )
}
export default Login;