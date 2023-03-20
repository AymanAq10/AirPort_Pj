import React, { useEffect, useRef, useState } from "react";
import { CgArrowLeftR } from "react-icons/cg";
import './profile.css';


export default function Profile() {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Domain, setDomain] = useState('');
    const [Number, setNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [CIN, setCIN] = useState('');
    const [Password, setPassword] = useState('');
    const [_Password, set_Password] = useState('');
    const [Profile, setProfile] = useState('/Images/Profile.png');

    const File = useRef();

    const StagiaireId = window.location.search.split('=')[1];

    // this function for get all stagiaire data
        // inputs => stagiaire id
        // outputs => object of all stagiaire data
    useEffect(() => {
        setTimeout(() => {
            document.body.className = '';
        }, 500);

        fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
            method: "POST", body: new URLSearchParams([['type', 'GetUserData'], ['id', StagiaireId]])
        })
            .then(resp => resp.json())
            .then(data => {
                setFirstName(data.Fname); setLastName(data.Lname);
                setDomain(data.Domain); setNumber(data._Number);
                setCIN(data.CIN); setEmail(data.Acc_email);
                setProfile(() => {
                    if (data.ImageProfile) {
                        return 'data:image/png;base64,' + data.ImageProfile;
                    };
                });

                set_Password(data._Password);
            });
    }, []);

    // this function for update stagiaire data
        // inputs => array of stagiaire data : [FirstName, LastName, Domain, Number, CIN, Email, Profile, StagiaireId]
        // outputs => ???
    function UpdateData(e) {
        e.preventDefault();

        const data = [
            FirstName, LastName, Domain, Number, CIN, Email, Profile, StagiaireId
        ];

        if (Password === _Password) {
            fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
                method: "POST", body: new URLSearchParams([['type', 'UpdateData'],
                    ['data', JSON.stringify(data)]])
            });
        } else {
            alert('The password incorrect !');
        }
    }

    function ChangeProfile() {
        const file = File.current.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          setProfile(reader.result);
        });
    
        reader.readAsDataURL(file);
    }

    return(
        <>
            <div className="profile_body">
                <nav className="airport_nav_bar">
                    <h4>Airport Stage</h4>
                    <div></div>
                </nav>
                <div className="Profile_info">
                        <div className="Profile_info_back_btn">
                            <button> <CgArrowLeftR /> </button>
                        </div>
                    <form>
                        <div className="Profile_info_picture">
                            <h4>Profile Picture</h4>
                                <div>
                                    <img src={Profile} alt="Profile" style={{ 
                                        position: "absolute", width: "100%", height: "100%", borderRadius: "5px"
                                     }}/>
                                    <button onClick={e => {e.preventDefault();File.current.click();}}>Edit</button>
                                    <input type="file" name="Profile" ref={File} style={{ display: "none" }}
                                        onChange={ChangeProfile}/>
                                </div>
                        </div>
                        <div className="Profile_info_form">
                                <div>
                                    <label htmlFor='Fname'>First Name</label>
                                    <input type='text' name='Fname' value={FirstName} 
                                        onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='Lname'>Last Name</label>
                                    <input type='text' name='Lname' value={LastName}
                                        onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='Domain'>Domain </label>
                                    <input type='text' name='Domain' value={Domain}
                                        onChange={e => setDomain(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='Phone'>Phone Number</label>
                                    <input type='tel' name='Phone' value={Number}
                                        onChange={e => setNumber(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='Email'>Email</label>
                                    <input type='email' name='UserEmail' value={Email}
                                        onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='CIN'>CIN</label>
                                    <input type='text' name='CIN' value={CIN}
                                        onChange={e => setCIN(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='Password'>Confirm password</label>
                                    <input type='password' name='UserPassword' value={Password}
                                        placeholder="Confirm your password for update data"
                                        onChange={e => setPassword(e.target.value)}/>
                                </div>
                                <div>
                                    <input className="update_profile" type='submit'
                                        name='Update' value='Update Profile' onClick={UpdateData}/>
                                </div>
                        </div>
                    </form>
                </div>
                <div className="Footer"></div>
            </div>
        </>
    );
};