import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Request from './RequestPage.module.css';

export default function RequestPage() {


    const file = useRef();

    function AddCv() {
        file.current.click();
    };

    const StagiaireId = window.location.search.split('=')[1];

    useEffect(() => {
        setTimeout(() => {
            document.body.className = '';
        }, 500);
    }, []);

    
    function SendRequest(e) {
        e.preventDefault()

        
        axios.get(`http://localhost:8000/api/Stagires/Requestes/Finder/${StagiaireId}`)
        .then(data => {
                if (!data.data.success) {

                    const formData      = new FormData();
                    formData.append('Acc_id', StagiaireId)
                    formData.append('Message', e.target.elements.message.value)
                    formData.append('StagiaireCV', e.target.elements.CV.files[0])

                    axios.post('http://localhost:8000/api/Requestes', formData )
                    .finally(alert('The request has been submitted!'))
                } else {
                    alert("You already sent a request!");
                }
            });
    };

  return (
    <div id={Request.RequestPage}>
      <div>
        <div>
            <h2>Entez votre information pour demande de stage</h2>
            <form onSubmit={SendRequest}>
                <div>
                    <label htmlFor="message">Ton Message</label>
                    <textarea id='message' placeholder='Message' name='message' ></textarea>
                </div>
                <div onClick={AddCv}>
                    <input ref={file} type="file" name="CV" style={{ display: 'none' }} />
                    <div>
                        <span className="material-symbols-outlined">download</span>
                        <p>Ajouter votre CV</p>
                    </div>
                </div>
                <div>
                <button type="submit" >Envoyer la demande</button>
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