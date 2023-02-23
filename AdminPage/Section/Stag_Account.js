import React, { useEffect, useRef, useState } from 'react';
import ListButton from './ListButton';
import { TiDelete } from 'react-icons/ti';

export default function Stag_Account() {

    const [AccountData, setAccountData] = useState([]);
    const [SomeAccData, setSomeAccData] = useState([]);

    const InputVal = useRef();
    const parent = useRef();

    useEffect(() => {
        fetch("http://localhost/airport-Project/src/BackEnd/Accounts.php", {
          method: 'POST',
          body: new URLSearchParams([['type', 'GetAccounts']])
        })
          .then(resp => resp.json())
          .then(data => setAccountData(data))
          .catch(err => console.log(err));
    }, []);

    function DeleteAccounts() {

        const ItemsId = Array.from(document.getElementsByClassName("CardActive")).map(ele => {
          return parseInt(ele.children[1].firstElementChild.textContent);
        });
    
        fetch("http://localhost/airport-Project/src/BackEnd/Accounts.php", {
          method: 'POST',
          body: new URLSearchParams([['type', 'DeleteAccounts'], ['ItemsId', ItemsId]])
        });
    
        setAccountData(prev => prev.filter(ele => {
          if (!(ItemsId.some(id => ele.Acc_id === id))) {
            return ele;
          }
        }));
    
        Array.from(document.getElementsByClassName("CardActive")).forEach(ele => {
          ele.classList.remove('CardActive');
        });
    };
    
    function DeleteAll() {
        fetch("http://localhost/airport-Project/src/BackEnd/Accounts.php", {
          method: 'POST',
          body: new URLSearchParams([['type', 'DeleteAll']])
        });
    
        setAccountData([]);
    }

    function SomeAccountData() {
        const ItemsId = Array.from(document.getElementsByClassName("CardActive")).map(ele => {
          return parseInt(ele.children[1].firstElementChild.textContent);
        });
    
        setSomeAccData(AccountData.filter(ele => {
          if (ItemsId.some(id => id === ele.Acc_id)) {
            return ele;
          }
        }));
    }

    function Search() {
      const id = parseInt(InputVal.current.value);
      let ScrollDown = 0;
  
      AccountData.forEach((ele, idx) => {
        if (id === ele.Acc_id) {
          parent.current.firstElementChild.scrollTo({left : 0, top : ScrollDown, behavior : "smooth"});
          parent.current.firstElementChild.children[idx].style = 'border: 3px solid green;';
          setTimeout(() => {
            parent.current.firstElementChild.children[idx].setAttribute('style', '');
          }, 3000);
        } else {
          if (Number.isInteger(idx / 3) && idx / 3 !== 0) {
            ScrollDown += 209;
          }
        }
      });
    };

  if (AccountData.length > 0) {
    return (
        <>
          <div>
            <input ref={InputVal} type="text" />
            <button type="button" onClick={Search}>Search</button>
          </div>
          <div ref={parent} id='AccountData'>
            <div>
              {AccountData.map((ele, idx) => <AccountCard eleKey={idx} obj={ele} setAccounts={setAccountData} />)}
            </div>
            <ListButton all={AccountData} some={SomeAccData} someData={SomeAccountData}
                deleteall={DeleteAll} deletesome={DeleteAccounts} />
          </div>
        </>
    );
  } else {
    return <img src="./Images/nodata.png" className='DefaultContent' />;
  }
};

function AccountCard({ eleKey, obj: {Acc_id, idStiaire, Acc_Email, Acc_Password}, setAccounts }) {

    const card = useRef();

    function CardClick() {
        card.current.classList.toggle('CardActive');
    };

    function DeleteAccount() {
        card.current.classList.remove('CardActive');

        fetch("http://localhost/airport-Project/src/BackEnd/Accounts.php", {
          method: 'POST',
          body: new URLSearchParams([['type', 'DeleteAccount'], ['ItemId', Acc_id]])
        });

        setAccounts(prev => prev.filter(ele => {
          if (ele.idStiaire !== idStiaire) {
            return ele;
          };
        }));

        card.current.classList.toggle('CardActive');
    };

    return (
        <div className='Cards' ref={card} key={eleKey} onClick={CardClick}>
          <span id='delete-item' onClick={DeleteAccount}><TiDelete /></span>
          <h2>Account id: <span>{Acc_id}</span></h2>
          <div>
            <p><span id='field'>Stagiaire id:</span> {idStiaire}</p>
            <p><span id='field'>Email:</span> {Acc_Email}</p>
            <p><span id='field'>Password:</span> {Acc_Password}</p>
          </div>
          <p>{eleKey + 1}</p>
        </div>
    );
}