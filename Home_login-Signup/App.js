import './Home_page/login_signup/style.css'
import Home from "./Home_page/Home";
import Login_signUp from "./Home_page/login_signup/login_Signup";
import Login from './Home_page/login_signup/SignUp';
import Signup from './Home_page/login_signup/Login';
import { Routes, Route, Link } from 'react-router-dom';
const App = ()=>{

    return (
        <>
            <div>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/Signup' element={<Signup/>}/>
                    <Route path='/Login' element={<Login/>}/>
                </Routes>
            </div>
        </>
    )
}
export default App;
