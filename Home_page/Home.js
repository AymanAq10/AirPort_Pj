import './Home.css'
import img from '../Home_page/imgs/icon_2.svg';
import img2 from '../Home_page/imgs/wld.png';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

function Home({ Profile }) {

    const [Check, setCheck] = useState(false);

    const ToRequestPage = useRef();
    const mobile69 = useRef();

    // this function for search a satagiaire
        // inputs => Stagiaire id
        // outputs => returns true if stagiaire finded else returns false
    useEffect(() => {
        const AdminId = window.location.search.split('=')[1];

        fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
            method: "POST", body: new URLSearchParams([
                ['type', 'SearchStagiaire'],
                ['id', AdminId]
            ])
        })
            .then(resp => resp.json())
            .then(data => setCheck(data));
    }, []);

    useEffect(() => {
        if (Check) {
            mobile69.current.remove();
        };
    }, [Check]);

    function EnterToRequestPage() {
        const href = "/Account/RequestPage" + Stagiaire;

        if (window.location.search && Check) {
            ToRequestPage.current.setAttribute('href', href);
        } else {
            alert("Create an account for send request");
        };
    };

    const dispatch = useDispatch();

    const Stagiaire = window.location.search;

    function mobilenav() {
        let div = document.getElementsByClassName('mobile69')[0];
        div.classList.toggle('active69');
    }
    // mobilenav()


    function ToggleSignUp(value) {
        dispatch({ type: 'Toggle_SingUp', payload: value });
    };

    return (
        <>
            <div>
                <section className='first_section69'>
                    <header>
                        <h1>Airport Stage</h1>
                        {
                            Check ? Profile :
                            <ul>
                                <li onClick={() => ToggleSignUp(true)}><Link to='/Signup'>Sign Up</Link></li>
                                <li onClick={() => ToggleSignUp(false)}><Link className='Login69' to='/Login'>Login</Link></li>
                            </ul>
                        }
                    </header>
                    <div ref={mobile69} className='mobile69'>
                        <div className='mobile_nav69' onClick={mobilenav}>
                            <div style={{ transition: "1s" }}></div>
                            <div></div>
                            <div style={{ transition: "1s" }}></div>
                        </div>
                        <div className='ul_div69'>
                            <ul>
                                <li><Link to='/Signup'>Sign Up</Link></li>
                                <li><Link className='Login69' to='/Login'>Login</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='Content_section69'>
                        <h2>Welcome to our airport internship website! </h2>
                        <p>We are thrilled to have you here and excited to help you take off on your career journey. Our mission is to provide you with the best airport internship opportunities,
                            where you can gain valuable experience and grow your skills.
                            Take a look around and explore our resources, and please don't hesitate to contact us if you have any questions.
                            We are here to support you every step of the way!
                        </p>
                        <div className='btns69'>
                            <a ref={ToRequestPage} onClick={EnterToRequestPage}>Request an Internship</a>
                            <a href="#explain">Explain more+</a>
                        </div>
                        <div className="svg3">
                        </div>
                    </div>
                    <div className='dark-mode69'>
                        <p style={{ background: `url(${img})`, width: "30px", height: "30px" }}></p>
                        <p>light-mode</p>
                    </div>
                </section>
                <section className='section_two69'>
                    <div className="Content_section269">
                        <div className='svg_class69'>

                        </div>
                        <p>We are happy to have you here and excited to help you take off on your career journey.
                            Our mission is to provide you with the best airport internship opportunities,
                            where you can gain valuable experience and grow your skills. Take a look around and explore our resources,
                            and please don't hesitate to contact us if you have any questions.
                            We are here to support you every step of the way!
                        </p>
                    </div>
                </section>
                <section id="explain" className="section_three69">
                    <div className="Content_section369">
                        <div>
                            <p>We are happy to have you here and excited to help you take off on your career journey.
                                Our mission is to provide you with the best airport internship opportunities,
                                where you can gain valuable experience and grow your skills. Take a look around and explore our resources,
                                and please don't hesitate to contact us if you have any questions.
                                We are here to support you every step of the way!
                            </p>

                        </div>
                        <div className='div_world69'>
                            <div  className='Aero69'></div>
                            <img src={img2} alt="" className='svg_class269'/>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}
export default Home;