import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ListButton from './ListButton';

export default function RequestAccepte() {

    const [RequestAccepte, setRequestAccepte] = useState([]);
    const [SomeRequestAccepte, setSomeRequestAccepte] = useState([]);

    const InputVal = useRef();
    const tbodyData = useRef();

    useEffect(() => {
        fetch("http://localhost/airport-Project/src/BackEnd/RequestAccepte.php", {
            method: 'POST', body: new URLSearchParams([['type', 'GetRequestAccepte']])
        })
            .then(res => res.json())
            .then(data => setRequestAccepte(data));

        // axios.get('http://localhost:8000/api/Requeste_accepters')
        //     .then(resp => setRequestAccepte(resp.data));
    }, []);

    function Search() {
        
    };

    function SomeDataRequestAccepte() {
        const ItemsId = Array.from(document.getElementsByClassName("ActiveRow")).map(ele => {
            return parseInt(ele.firstElementChild.textContent);
        });

        setSomeRequestAccepte(RequestAccepte.filter(ele => {
            if (ItemsId.find(item => item === ele.Acc_id)) {
                return ele;
            };
        }));

        Array.from(document.getElementsByClassName("ActiveRow")).forEach(ele => {
            ele.classList.toggle("ActiveRow");
        });
    }

    function DeleteAll() {
        fetch("http://localhost/airport-Project/src/BackEnd/RequestAccepte.php", {
            method: "POST", body: new URLSearchParams([['type', 'RemoveAll']])
        });

        // axios.delete('http://localhost:8000/api/Requeste_accepter/clear');

        setRequestAccepte([]);
    }

    function DeleteItems() {
        const ItemsId = Array.from(document.getElementsByClassName("ActiveRow")).map(ele => {
            return parseInt(ele.firstElementChild.textContent);
        });

        fetch("http://localhost/airport-Project/src/BackEnd/RequestAccepte.php", {
            method: "POST", body: new URLSearchParams([['type', 'RemoveSome'], ['data', JSON.stringify(ItemsId)]])
        });

        // axios.delete('http://localhost:8000/api/Multi-Requestes-acc', {data: {ItemId: ItemsId}});

        setRequestAccepte(prev => prev.filter(ele => {
            if (!(ItemsId.find(item => item === ele.Acc_id))) {
                return ele;
            }
        }));

        Array.from(document.getElementsByClassName("ActiveRow")).forEach(ele => {
            ele.classList.toggle("ActiveRow");
        });
    }

    function DownloadCV() {
        fetch('http://localhost/airport-Project/src/BackEnd/RequestAccepte.php', {
            method: "POST", body: new URLSearchParams([['type', 'DownoaldAllCV']])
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to download PDFs');
              }
              return response.blob();
            })
            .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'pdfs.zip';
              a.click();
              a.remove();
            })
            .catch(error => console.error(error));
    }

    if (RequestAccepte.length > 0) {
        return (
            <>
                <div>
                  <input ref={InputVal} type="text" />
                  <button type="button" onClick={Search}>Search</button>
                </div>
                <div id='RequestAccepte'>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Stagiaire id</th>
                                    <th>Prenom</th>
                                    <th>Nom</th>
                                    <th>Domain</th>
                                    <th>Message</th>
                                    <th>CIN</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Password</th>
                                    <th>Date de demande</th>
                                    <th>Date accepte la demande</th>
                                </tr>
                            </thead>
                            <tbody ref={tbodyData}>
                                {RequestAccepte.map((ele, idx) => <TbodyData index={idx} obj={ele}/>)}
                            </tbody>
                        </table>
                    </div>
                    <div id='btnContainer'>
                        <ListButton all={RequestAccepte} some={SomeRequestAccepte} someData={SomeDataRequestAccepte}
                            deleteall={DeleteAll} deletesome={DeleteItems}/>
                        <button type="button" onClick={DownloadCV}>
                            <span className="material-symbols-outlined">download</span>
                            <span style={{ marginLeft: "5px" }}>Downoald All CV</span>
                        </button>
                    </div>
                </div>
            </>
        );
    } else {
        return <img src="http://localhost:3000/Images/nodata.png" className='DefaultContent' />;
    }
};

function TbodyData({index, obj: {Acc_id, Fname, Lname, Domain, Message, _Number, Acc_email, CIN, _Password, RequDate, RequDateAcc}}) {

    const row = useRef();

    function onClickOnRow() {
        row.current.classList.toggle("ActiveRow");
    };

    return (
        <tr ref={row} key={index} onClick={onClickOnRow}>
            <td>{Acc_id}</td>
            <td>{Fname}</td>
            <td>{Lname}</td>
            <td>{Domain}</td>
            <td>{Message !== undefined && Message.length > 10 ? Message.slice(0, 11) + '...' : Message}</td>
            <td>{_Number}</td>
            <td>{Acc_email}</td>
            <td>{CIN}</td>
            <td>{_Password}</td>
            <td>{RequDate}</td>
            <td>{RequDateAcc}</td>
        </tr>
    );
}