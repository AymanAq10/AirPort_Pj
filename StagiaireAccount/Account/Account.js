import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './Account.css';

export default function Account() {

  const [Profile1, setProfile1] = useState()

  const Menu = useRef();

  const StagiaireId = window.location.search.split('=')[1];

  // this function for get Stagiaire image
    // inputs => Stagiaire id
    // outputs => image link (blob)
  useEffect(() => {

    axios.get(`http://localhost:8000/api/Stagires/Image_tracker/${StagiaireId}`)
      .then(data => {
        if ( data.data ) {
          const src = data.data;
          setProfile1(`data:image/png;base64,${src}`);
        };
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div id='Account' onClick={() => Menu.current.classList.toggle("HideAccountMenu")}>
      <div id='Profile'>
        <img src={Profile1 === 'data:image/png;base64,ProImg' ? 'https://static.vecteezy.com/system/resources/previews/001/844/566/large_2x/jet-engine-design-illustration-isolated-on-white-background-free-vector.jpg' : Profile1} alt="Profile" />
      </div>
      <IoMdArrowDropdown />
      <ul id='AccountMenu' ref={Menu} className='HideAccountMenu'>
        <li><a href="#">État de la demande</a></li>
        <li><a href={"/Account/Setting" + window.location.search}>Paramètre</a></li>
        <li><a href="/">Se Déconnecter</a></li>
      </ul>
    </div>
  );
};