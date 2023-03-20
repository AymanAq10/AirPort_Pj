import React, { useEffect, useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import ListButton from './ListButton';
import axios from 'axios';

export default function Stagiaire() {

  const [DataStag, setDataStag] = useState([]);
  const [SomeDataStag, setSomeDataStag] = useState([]);

  const InputVal = useRef();
  const parent = useRef();

  // this request is done !
  useEffect(() => {
    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'GetData']])
    })
      .then(resp => resp.json())
      .then(data => setDataStag(data))
      .catch(err => console.log(err));

    // axios.get('http://127.0.0.1:8000/api/Stagires')
    //   .then(resp => setDataStag(resp.data));

  }, []);

  function Search() {
    const id = parseInt(InputVal.current.value);
    let ScrollDown = 0, num, moveNum;

    if (window.innerWidth >= 300 && window.innerWidth < 500) {
      num = 1; ScrollDown = 150; moveNum = 309;
    }

    else if (window.innerWidth >= 500 && window.innerWidth <= 750) {
      num = 2; moveNum = 304;
    }

    else if (window.innerWidth > 750 && window.innerWidth <= 1100) {
      num = 3; moveNum = 307;
    }

    else {
      num = 3; moveNum = 309;
    }

    DataStag.forEach((ele, idx) => {
      if (id === ele.Acc_id) {
        parent.current.firstElementChild.scrollTo({left : 0, top : ScrollDown, behavior : "smooth"});
        parent.current.firstElementChild.children[idx].style = 'border: 3px solid green;';
        setTimeout(() => {
          parent.current.firstElementChild.children[idx].setAttribute('style', '');
        }, 3000);
      } else {
        if (Number.isInteger(idx / num) && idx / num !== 0) {
          ScrollDown += moveNum;
        }
      }
    });
  };

  // this request is done !
  function DeleteItems() {

    const ItemsId = Array.from(document.getElementsByClassName("CardActive")).map(ele => {
      return parseInt(ele.children[1].firstElementChild.textContent);
    });

    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteItems'], ['ItemsId', ItemsId]])
    });

    // axios.delete(`http://127.0.0.1:8000/api/Multi-Stagiaire_acc?ItemsId=` + JSON.stringify(ItemsId));

    setDataStag(prev => prev.filter(ele => {
      if (!(ItemsId.some(id => ele.Acc_id === id))) {
        return ele;
      }
    }));

    Array.from(document.getElementsByClassName("CardActive")).forEach(ele => {
      ele.classList.remove('CardActive');
    });
  };

  // this request is done !
  function DeleteAll() {
    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteAll']])
    });

    // axios.delete('http://127.0.0.1:8000/api/stagires/clear');

    setDataStag([]);
  }

  function SomeDataStagiaire() {
    const ItemsId = Array.from(document.getElementsByClassName("CardActive")).map(ele => {
      return parseInt(ele.children[1].firstElementChild.textContent);
    });

    setSomeDataStag(DataStag.filter(ele => {
      if (ItemsId.some(id => id === ele.Acc_id)) {
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
    return <img src="http://localhost:3000/Images/nodata.png" className='DefaultContent' />;
  }
};

function StagiaireCards({eleKey, obj: {Acc_id, Fname, Lname, Domain, _Number, CIN, Acc_email, _Password}, Data}) {

  const card = useRef();

  function CardClick() {
    card.current.classList.toggle('CardActive');
  };

  // this request is done !
  function DeleteItem() {
    card.current.classList.remove('CardActive');

    fetch("http://localhost/airport-Project/src/BackEnd/Statgiaire.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteItem'], ['ItemId', Acc_id]])
    });

    // axios.delete(`http://localhost:8000/api/Stagires/${Acc_id}`);

    Data(prev => prev.filter(ele => {
      if (ele.Acc_id !== Acc_id) {
        return ele;
      };
    }));

    card.current.classList.toggle('CardActive');
  };

  return (
    <div className='Cards' ref={card} key={eleKey} onClick={CardClick}>
      <span id='delete-item' onClick={DeleteItem}><TiDelete /></span>
      <h2>Stagiaire id: <span>{Acc_id}</span></h2>
      <div>
        <p><span id='field'>First Name:</span> {Fname}</p>
        <p><span id='field'>Last Name:</span> {Lname}</p>
        <p><span id='field'>Domain:</span> {Domain}</p>
        <p><span id='field'>Phone:</span> {_Number}</p>
        <p><span id='field'>CIN:</span> {CIN}</p>
        <p><span id='field'>Email:</span> {Acc_email}</p>
        <p><span id='field'>Password:</span> {_Password}</p>
      </div>
      <p>{eleKey + 1}</p>
    </div>
  );
};