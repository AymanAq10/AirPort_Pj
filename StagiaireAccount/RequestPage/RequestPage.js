import React, { useEffect, useRef, useState } from 'react';
import Request from './RequestPage.module.css';

export default function RequestPage() {

    const [message, setmassage] = useState('');

    const file = useRef();

    const StagiaireId = window.location.search.split('=')[1];

    useEffect(() => {
        setTimeout(() => {
            document.body.className = '';
        }, 500);
    }, []);

    function AddCv() {
        file.current.click();
    };

    function SendRequest() {

        // this function for check request to request table
            // inputs => stagiaire id
            // outputs => returns true if the request finded else returns flase
        fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
            method: "POST", body: new URLSearchParams([
                ['type', 'CheckRequest'],
                ['ItemId', StagiaireId]
            ])
        })
            .then(resp => resp.json())
            .then(data => {
                if (!data) {

                    // this request for send Request in request table
                        // inputs => array [Stagiaire id, message, CV (pdf file)]
                        // outputs => ???
                    const file = document.getElementById("file");

                    const formData = new FormData();
                    formData.append('type', 'AddRequest');
                    formData.append('data', JSON.stringify([StagiaireId, message]));
                    formData.append('pdf_file', file.files[0]);

                    fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
                        method: "POST",
                        body: formData
                    });

                    setmassage('');
                } else {
                    alert("You are sended a request !!");
                }
            });
    };

  return (
    <div id={Request.RequestPage}>
      <div>
        <div>
            <h2>Entez votre information pour demande de stage</h2>
            <form>
                <div>
                    <label htmlFor="message">Ton Message</label>
                    <textarea id='message' placeholder='Message' name='message'
                        value={message} onChange={e => setmassage(e.target.value)}></textarea>
                </div>
                <div onClick={AddCv}>
                    <input ref={file} id="file" type="file" name="CV" style={{ display: 'none' }} />
                    <div>
                        <span className="material-symbols-outlined">download</span>
                        <p>Ajouter votre CV</p>
                    </div>
                </div>
                <div>
                    <button type="button" onClick={SendRequest}>Envoyer la demande</button>
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