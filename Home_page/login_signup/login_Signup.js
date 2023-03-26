import './style.css';

import Signup from './SingUp';
import Login from './Login';

const LoginsignUp = () => {
	return (
		<div className="main69">
			<input type="checkbox" id="chk" aria-hidden="true" />
			<Login/>
			<Signup/>
		</div>
	);
}
export default LoginsignUp;