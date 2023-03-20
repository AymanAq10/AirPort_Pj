import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './Account.css';

export default function Account() {

  const [Profile, setProfile] = useState('http://localhost:3000/Images/Profile.png')

  const Menu = useRef();

  const StagiaireId = window.location.search.split('=')[1];

  // this function for get Stagiaire image
    // inputs => Stagiaire id
    // outputs => image link (blob)
  useEffect(() => {
    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: "POST", body: new URLSearchParams([['type', 'GetProfile'], ['id', StagiaireId]])
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.ImageProfile) {
          const src = 'data:image/png;base64,' + data.ImageProfile;
          setProfile(src);
        };
      });
  }, []);

  return (
    <div id='Account' onClick={() => Menu.current.classList.toggle("HideAccountMenu")}>
      <div id='Profile'>
        <img src={Profile} alt="Profile" />
      </div>
      <IoMdArrowDropdown />
      <ul id='AccountMenu' ref={Menu} className='HideAccountMenu'>
        <li><a href="#">État de la demande</a></li>
        <li><a href={"/Account/Setting" + window.location.search}>Paramètre</a></li>
        <li><a href="http://localhost:3000">Se Déconnecter</a></li>
      </ul>
    </div>
  );
};