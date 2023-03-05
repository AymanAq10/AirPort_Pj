// import './Home_page/login_signup/style.css'
import Home from "./Home_page/Home";
import Login_signUp from "./Home_page/login_signup/login_Signup";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

export default function UserPage () {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/Signup' element={<Login_signUp/>}/>
                    <Route path='/Login' element={<Login_signUp/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};