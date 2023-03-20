import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';

export default function Requests() {

  const [RequestData, setRequestData] = useState([]);

  const InputVal = useRef();
  const parent = useRef();

  // this request is done !
  useEffect(() => {
    fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
      method: 'POST', body: new URLSearchParams([["type", "GetAllRequests"]])
    })
      .then(resp => resp.json())
      .then(data => {setRequestData(data)})
      .catch(err => console.log(err))

    // axios.get('http://localhost:8000/api/Requestes')
    //   .then(resp => setRequestData(resp.data));

  }, []);

  function Search() {
    const id = parseInt(InputVal.current.value);
    let ScrollDown = 0, num, moveNum;

    if (window.innerWidth >= 300 && window.innerWidth < 500) {
      num = 1; ScrollDown = 414; moveNum = 414;
    }

    else {
      num = 1; moveNum = 414;
    }

    RequestData.forEach((ele, idx) => {
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
  }

  // this request is done !
  function DeleteAll() {

    fetch('http://localhost/airport-Project/src/BackEnd/Requests.php', {
      method: 'POST', body: new URLSearchParams([['type', 'DeleteAllRequests']])
    });

    // axios.delete('http://localhost:8000/api/requestes/clear');

    setRequestData([]);
  }

  // this request is done !
  function AccepteSomeRequests() {
    const ItemsId = Array.from(document.getElementsByClassName("CardActive")).map(ele => {
      return parseInt(ele.children[1].firstElementChild.textContent);
    });

    fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'AccepteReq'], ['ItemsId', ItemsId]])
    })
      .then(resp => resp.json())
      .then(data => console.log(data));

    // axios.delete('http://localhost:8000/api/Requestes_accepter', {
    //   data: {ItemsId: ItemsId}
    // });

    Array.from(document.getElementsByClassName("CardActive")).forEach(ele => {
      ele.classList.remove('CardActive');
    });
  }

  // this request is done !
  function AccepteAllRequests() {
    const ItemsId = RequestData.map(ele => ele.Acc_id);

    fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'AccepteReq'], ['ItemsId', ItemsId]])
    })
      .then(resp => resp.json())
      .then(data => console.log(data));

    // axios.delete('http://localhost:8000/api/Requestes_accepter', {
    //   data: {ItemsId: ItemsId}
    // });
  }

  // this request is done !
  function DeleteRequestsNotAccepte() {
    fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
      method: 'POST', body: new URLSearchParams([['type', 'DeleteRequestsNotAccepte']])
    })
      .then(res => res.json())
      .then(data => {
        setRequestData(prev => {
          return prev.filter(ele => {
            if (data.find((id) => ele.Acc_id === id)) {
              return ele;
            }
          });
        });
      });

    // axios.delete('http://localhost:8000/api/RemoveRequestNotAccepte');
  };

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
            <button type="button" className='remove' onClick={DeleteRequestsNotAccepte}>Remove the request not accpted</button>
            <button type="button" className='remove' onClick={DeleteAll}>Remove All</button>
            <button type="button" className='save' onClick={AccepteAllRequests}>Accept All</button>
            <button type="button" className='save' onClick={AccepteSomeRequests}>Accept</button>
          </div>
        </div>
        <ShowPdfFile />
      </>
    );
  } else {
    return <img src="http://localhost:3000/Images/nodata.png" className='DefaultContent' />;
  }
};



function RequestCard({eleKey, obj: {Acc_id, Message, RequDate}, Data}) {

  const card = useRef();

  function CardClick() {
    card.current.classList.toggle('CardActive');
  };

  // this function for delete one request from Request table
    // inputs => request id
    // outputs => ???
  function DeleteItem() {
    card.current.classList.remove('CardActive');

    fetch("http://localhost/airport-Project/src/BackEnd/Requests.php", {
      method: 'POST',
      body: new URLSearchParams([['type', 'DeleteRequest'], ['ItemId', Acc_id]])
    });

    Data(prev => prev.filter(ele => {
      if (ele.Acc_id !== Acc_id) {
        return ele;
      };
    }));

    card.current.classList.toggle('CardActive');
  };

  // this function for view Stagiaire CV in page
    // inputs => Stagiaire id
    // outputs => CV link (blob)
  function ViewPDFFile() {
    fetch('http://localhost/airport-Project/src/BackEnd/Requests.php', {
      method: "POST", body: new URLSearchParams([['type', 'viewPdfFile'], ['id', Acc_id]])
    })
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const embedPdfFile = document.getElementById("embedPdfFile");
        const PdfFile_View = document.querySelector(".PdfFile_View");

        PdfFile_View.style.display = 'block';
        embedPdfFile.src = url;
      })
      .catch(error => console.log(error));

      card.current.classList.toggle("CardActive");
  }

  // this function for view Stagiaire CV in page
    // inputs => Stagiaire id
    // outputs => CV link (blob)
  function DownoaldPDFFile() {
    fetch('http://localhost/airport-Project/src/BackEnd/Requests.php', {
      method: "POST", body: new URLSearchParams([['type', 'DawnoaldPdfFile'], ['id', Acc_id]])
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });

      card.current.classList.toggle("CardActive");
  }

  return (
    <div className='ReqCards' ref={card} key={eleKey} onClick={CardClick}>
      <span id='delete-item' onClick={DeleteItem}><TiDelete /></span>
      <h2>Stagiaire id: <span>{Acc_id}</span></h2>
      <h3>Request date: <span>{RequDate}</span></h3>
      <div>
        {Message}
      </div>
      <div>
        <button type="button" onClick={ViewPDFFile}>
          <span className="material-symbols-outlined">visibility</span>
          <p>View CV</p>
        </button>
        <button type="button" onClick={DownoaldPDFFile}>
          <span className="material-symbols-outlined">download</span>
          <p>Downoald CV</p>
        </button>
      </div>
      <p>{eleKey + 1}</p>
    </div>
  );
}

function ShowPdfFile() {

  const view = useRef();

  function hide() {
    view.current.style = '';
  }

  return (
    <div ref={view} className='PdfFile_View'>
      <span id='CancelPdfFile' onClick={hide}><TiDelete /></span>
      <div>
        <embed id='embedPdfFile' style={{ width: "100%", height: "100%" }} type="application/pdf" />
      </div>
    </div>
  );
}