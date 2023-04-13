import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CgArrowLeftR } from "react-icons/cg";
import { redirect } from "react-router-dom";
import './profile.css';


export default function Profile() {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Domain, setDomain] = useState('');
    const [Number, setNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [CIN, setCIN] = useState('');
    const [checkOldPassword, setCheckOldPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [Profile, setProfile] = useState();

    const File = useRef();

    const StagiaireId = window.location.search.split('=')[1];

    // this function for get all stagiaire data
        // inputs => stagiaire id
        // outputs => object of all stagiaire data
    useEffect(() => {
        setTimeout(() => {
            document.body.className = '';
        }, 500);

        setTimeout(() => {
        axios.get(`http://localhost:8000/api/Stagires/track/${StagiaireId}`)
        .then(data => {
            setFirstName(data.data.Fname);   setLastName(data.data.Lname);
            setDomain(data.data.Domain);     setNumber(data.data._Number);
            setCIN(data.data.CIN);           setEmail(data.data.Acc_email);
            
            setProfile(`${data.data.ImageProfile}`)
            
            setCheckOldPassword(data.data._Password);
        });
        }, 600);
    }, []);

    // this function for update stagiaire data
        // inputs => array of stagiaire data : [FirstName, LastName, Domain, Number, CIN, Email, Profile, StagiaireId]
        // outputs => ???
    function UpdateData(e) {
        e.preventDefault();

        const data = [{FirstName, LastName, Domain, Number, CIN, Email, Profile, conPassword, StagiaireId}];

        if (newPassword === conPassword) {
            if (oldPassword === checkOldPassword) {
                axios.put(`http://localhost:8000/api/Stagires/${StagiaireId}`, data)
            }
            else{
                alert('Old password isn\'t valid')
            }
        } else {
            alert('Password confirmation doesn\'t match the password');
        }
    }

    function ChangeProfile() {
        const file = File.current.files[0];
        const reader = new FileReader();
      
        reader.addEventListener("load", () => {
          
          const base64Image = reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
          setProfile(base64Image);

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
                            <button onClick={() => window.location.href = `/Account?id=${StagiaireId}`}> <CgArrowLeftR /> </button>
                        </div>
                    <form>
                        <div className="Profile_info_picture">
                            <h4>Profile Picture</h4>
                                <div>

                                    <img src={Profile === 'ProImg' ? 'https://static.vecteezy.com/system/resources/previews/001/844/566/large_2x/jet-engine-design-illustration-isolated-on-white-background-free-vector.jpg' : `data:image/png;base64,${Profile}`} alt="Profile" style={{ 
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
                                    <label htmlFor='Password'>Old password</label>
                                    <input type='password' name='UserOldPassword' 
                                        onChange={e => setOldPassword(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='Password'>New password</label>
                                    <input type='password' name='UserNewPassword' 
                                        onChange={e => setNewPassword(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor='Password'>Confirm new password</label>
                                    <input type='password' name='UserConfirmPassword' 
                                        onChange={e => setConPassword(e.target.value)}/>
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
