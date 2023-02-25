import React, { useRef } from 'react';
import Request from './RequestPage.module.css';

export default function RequestPage() {

    const file = useRef();

    function AddCv() {
        file.current.click();
    }

    const value = () => {
        console.log(file.current.value);
    }

  return (
    <div id={Request.RequestPage}>
      <div>
        <div>
            <h2>Recevez les nouvelles offres d'emploi par email</h2>
            <form>
                <div>
                    <label for="LastName">Prenom</label>
                    <input type="text" name="LastName" id='LastName' placeholder='Votre prenom' />
                </div>
                <div>
                    <label for="FirstName">Nom</label>
                    <input type="text" name="FirstName" id='FirstName' placeholder='Votre nom' />
                </div>
                <div>
                    <label for="Email">Adresse email</label>
                    <input type="email" name="Email" id='Email' placeholder='Votre adresse email'/>
                </div>
                <div onClick={AddCv}>
                    <input ref={file} type="file" name="CV" style={{ display: 'none' }} onChange={value}/>
                    <div>
                        <span class="material-symbols-outlined">download</span>
                        <p>Ajouter votre CV</p>
                    </div>
                </div>
                <div>
                    <button type="button">Je postule sur le site du recruteur</button>
                </div>
            </form>
        </div>
        <footer>
            <div>
                <h3>CONTACTS</h3>
                <div>
                    <p>Phone: +212528893791</p>
                    <p>Email: test@test.test</p>
                </div>
            </div>
            <div>
                <h3>LOCATIONS</h3>
                <div>
                    <p>Aeropuerto Internacional</p>
                    <p>de El Aaiun - Hssan I</p>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};