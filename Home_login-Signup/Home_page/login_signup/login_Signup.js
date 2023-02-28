import './style.css';
import Signup from './SignUp';
import Login from './Login';
const Login_signUp = () => {
	return (

		<div class="main">

			<input type="checkbox" id="chk" aria-hidden="true" />

			<Signup/>
			<Login/>

		</div>
	);
}
export default Login_signUp;
