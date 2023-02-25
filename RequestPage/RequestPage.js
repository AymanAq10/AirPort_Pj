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
            <h2>Entez votre information pour demande de stage</h2>
            <form>
                <div>
                    <label for="message">Ton Message</label>
                    <textarea id='message' placeholder='Message' name='message'></textarea>
                </div>
                <div onClick={AddCv}>
                    <input ref={file} type="file" name="CV" style={{ display: 'none' }} onChange={value}/>
                    <div>
                        <span class="material-symbols-outlined">download</span>
                        <p>Ajouter votre CV</p>
                    </div>
                </div>
                <div>
                    <button type="button">Envoyer la demande</button>
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