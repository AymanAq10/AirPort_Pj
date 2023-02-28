import './Home.css'
import img from '../Home_page/imgs/icon_2.svg';
import Login from './login_signup/Login';
import Signup from './login_signup/SignUp';
import img2 from '../Home_page/imgs/wld.png';
import { Link } from 'react-router-dom';
function Home() {
    function mobilenav() {
        let div = document.getElementsByClassName('mobile')[0];
        div.classList.toggle('active');
    }
    // mobilenav()
    return (
        <>
            <div>
                <section className='first_section'>
                    <header>
                        <h1>Airport Stage</h1>
                        <ul>
                            <li><Link to='/Signup'>Sign Up</Link></li>
                            <li><Link className='Login' to='/Login'>Login</Link></li>
                        </ul>
                    </header>
                    <div className='mobile'>
                        <div className='mobile_nav' onClick={mobilenav}>
                            <div style={{ transition: "1s" }}></div>
                            <div></div>
                            <div style={{ transition: "1s" }}></div>
                        </div>
                        <div className='ul_div'>
                            <ul>
                                <li><Link to='/Signup'>Sign Up</Link></li>
                                <li><Link className='Login' to='/Login'>Login</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='Content_section'>
                        <h2>Welcome to our airport internship website! </h2>
                        <p>We are thrilled to have you here and excited to help you take off on your career journey. Our mission is to provide you with the best airport internship opportunities,
                            where you can gain valuable experience and grow your skills.
                            Take a look around and explore our resources, and please don't hesitate to contact us if you have any questions.
                            We are here to support you every step of the way!
                        </p>
                        <div className='btns'>
                            <a href="/Post">Request an Internship</a>
                            <a href="#explain">Explain more+</a>
                        </div>
                        <div className="svg3">
                        </div>
                    </div>
                    <div className='dark-mode'>
                        <p style={{ background: `url(${img})`, width: "30px", height: "30px" }}></p>
                        <p>light-mode</p>
                    </div>
                </section>
                <section className='section_two'>
                    <div className="Content_section2">
                        <div className='svg_class'>

                        </div>
                        <p>We are happy to have you here and excited to help you take off on your career journey.
                            Our mission is to provide you with the best airport internship opportunities,
                            where you can gain valuable experience and grow your skills. Take a look around and explore our resources,
                            and please don't hesitate to contact us if you have any questions.
                            We are here to support you every step of the way!
                        </p>
                    </div>
                </section>
                <section id="explain" className="section_three">
                    <div className="Content_section3">
                        <div>
                            <p>We are happy to have you here and excited to help you take off on your career journey.
                                Our mission is to provide you with the best airport internship opportunities,
                                where you can gain valuable experience and grow your skills. Take a look around and explore our resources,
                                and please don't hesitate to contact us if you have any questions.
                                We are here to support you every step of the way!
                            </p>

                        </div>
                        <div className='div_world'>
                            <div  className='Aero'></div>
                            <img src={img2} alt="" className='svg_class2'/>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}
export default Home;