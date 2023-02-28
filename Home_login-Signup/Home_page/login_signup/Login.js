import './style.css';
const Signup = () => {
    return (
        <div class="login">
			<input type="checkbox" id="chk" aria-hidden="true" />
            <form>
                <label for="chk" aria-hidden="true">Sign up</label>
                <input type="text" name="txt" placeholder="User name" required/>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="pswd" placeholder="Password" required />
                <input type="password" name="pswd" placeholder="ConfirmPassword" required />
                <button><i></i>Sign up</button>
            </form>
        </div>
    )
}
export default Signup;