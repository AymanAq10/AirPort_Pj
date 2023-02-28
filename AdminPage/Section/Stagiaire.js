import React, { useEffect, useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import ListButton from './ListButton';

export default function Stagiaire() {

  const [DataStag, setDataStag] = useState([]);
  const [SomeDataStag, setSomeDataStag] = useState([]);

  const InputVal = useRef();
  const parent = useRef();

  useEffect(() => {
    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'GetData']])
    })
      .then(resp => resp.json())
      .then(data => setDataStag(data))
      .catch(err => console.log(err));
  }, []);

  function Search() {
    const id = parseInt(InputVal.current.value);
    let ScrollDown = 0;

    DataStag.forEach((ele, idx) => {
      if (id === ele.idStiaire) {
        parent.current.firstElementChild.scrollTo({left : 0, top : ScrollDown, behavior : "smooth"});
        parent.current.firstElementChild.children[idx].style = 'border: 3px solid green;';
        setTimeout(() => {
          parent.current.firstElementChild.children[idx].setAttribute('style', '');
        }, 3000);
      } else {
        if (Number.isInteger(idx / 3) && idx / 3 !== 0) {
          ScrollDown += 309;
        }
      }
    });
  };

  function DeleteItems() {

    const ItemsId = Array.from(document.getElementsByClassName("CardActive")).map(ele => {
      return parseInt(ele.children[1].firstElementChild.textContent);
    });

    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteItems'], ['ItemsId', ItemsId]])
    });

    setDataStag(prev => prev.filter(ele => {
      if (!(ItemsId.some(id => ele.idStiaire === id))) {
        return ele;
      }
    }));

    Array.from(document.getElementsByClassName("CardActive")).forEach(ele => {
      ele.classList.remove('CardActive');
    });
  };

  // <input type='text' name='email' />

  function DeleteAll() {
    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteAll']])
    });

    setDataStag([]);
  }

  function SomeDataStagiaire() {
    const ItemsId = Array.from(document.getElementsByClassName("CardActive")).map(ele => {
      return parseInt(ele.children[1].firstElementChild.textContent);
    });

    setSomeDataStag(DataStag.filter(ele => {
      if (ItemsId.some(id => id === ele.idStiaire)) {
        return ele;
      }
    }));
  }

  if (DataStag.length > 0) {
    return (
      <>
        <div>
          <input ref={InputVal} type="text" />
          <button type="button" onClick={Search}>Search</button>
        </div>
        <div ref={parent} id='StagiaireData'>
          <div>
            {DataStag.map((ele, idx) => <StagiaireCards eleKey={idx} obj={ele} Data={setDataStag}/>)}
          </div>
          <ListButton all={DataStag} some={SomeDataStag} someData={SomeDataStagiaire}
            deleteall={DeleteAll} deletesome={DeleteItems}/>
        </div>
      </>
    );
  } else {
    return <img src="./Images/nodata.png" className='DefaultContent' />;
  }
};

function StagiaireCards({eleKey, obj: {idStiaire, FirstName, LastName, Specialty, Thel, CIN, Email, Password}, Data}) {

  const card = useRef();

  function CardClick() {
    card.current.classList.toggle('CardActive');
  };

  function DeleteItem() {
    card.current.classList.remove('CardActive');

    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteItem'], ['ItemId', idStiaire]])
    });

    Data(prev => prev.filter(ele => {
      if (ele.idStiaire !== idStiaire) {
        return ele;
      };
    }));

    card.current.classList.toggle('CardActive');
  };

  return (
    <div className='Cards' ref={card} key={eleKey} onClick={CardClick}>
      <span id='delete-item' onClick={DeleteItem}><TiDelete /></span>
      <h2>Stagiaire id: <span>{idStiaire}</span></h2>
      <div>
        <p><span id='field'>First Name:</span> {FirstName}</p>
        <p><span id='field'>Last Name:</span> {LastName}</p>
        <p><span id='field'>Specialty:</span> {Specialty}</p>
        <p><span id='field'>Phone:</span> {Thel}</p>
        <p><span id='field'>CIN:</span> {CIN}</p>
        <p><span id='field'>Email:</span> {Email}</p>
        <p><span id='field'>Password:</span> {Password}</p>
      </div>
      <p>{eleKey + 1}</p>
    </div>
  );
};