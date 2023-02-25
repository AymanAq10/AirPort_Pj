import React, { useEffect, useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';

export default function Requests() {

  const [RequestData, setRequestData] = useState([]);

  const InputVal = useRef();
  const parent = useRef();

  useEffect(() => {
    fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
      method: 'POST', body: new URLSearchParams([["type", "GetAllRequests"]])
    })
      .then(resp => resp.json())
      .then(data => {setRequestData(data)})
      .catch(err => console.log(err))
  }, []);

  function Search() {
    
  }

  if (RequestData.length > 0) {
    return (
      <>
        <div>
          <input ref={InputVal} type="text" />
          <button type="button" onClick={Search}>Search</button>
        </div>
        <div ref={parent} id='RequestData'>
          <div>
            {RequestData.map((ele, idx) => <RequestCard eleKey={idx} obj={ele} Data={setRequestData}/>)}
          </div>
          <div>
            <button type="button" className='remove'>Remove All</button>
            <button type="button" className='remove'>Remove the request not accpted</button>
            <button type="button" className='save'>Accept All</button>
            <button type="button" className='save'>Accept</button>
          </div>
        </div>
      </>
    );
  } else {
    return <img src="./Images/nodata.png" className='DefaultContent' />;
  }
};



function RequestCard({eleKey, obj: {Acc_id, Message, RequDate}, Data}) {

  const card = useRef();

  function CardClick() {
    card.current.classList.toggle('CardActive');
  };

  function DeleteItem() {
    card.current.classList.remove('CardActive');

    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteItem'], ['ItemId', Acc_id]])
    });

    Data(prev => prev.filter(ele => {
      if (ele.Acc_id !== Acc_id) {
        return ele;
      };
    }));

    card.current.classList.toggle('CardActive');
  };

  return (
    <div className='ReqCards' ref={card} key={eleKey} onClick={CardClick}>
      <span id='delete-item' onClick={DeleteItem}><TiDelete /></span>
      <h2>Stagiaire id: <span>{Acc_id}</span></h2>
      <h3>Request date: <span>{RequDate}</span></h3>
      <div>
        {Message}
      </div>
      <div>
        <button type="button">
          <span class="material-symbols-outlined">visibility</span>
          <p>View CV</p>
        </button>
        <button type="button">
          <span class="material-symbols-outlined">download</span>
          <p>Downoald CV</p>
        </button>
      </div>
      <p>{eleKey + 1}</p>
    </div>
  );
}