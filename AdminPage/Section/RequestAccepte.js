import React, { useEffect, useState } from 'react';

export default function RequestAccepte() {

    const [RequestAccepte, setRequestAccepte] = useState([]);

    useEffect(() => {
        fetch("http://localhost/airport-Project/src/BackEnd/RequestAccepte.php", {
            method: 'POST', body: new URLSearchParams([['type', 'GetRequestAccepte']])
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }, []);

    if (RequestAccepte.length > 0) {
        return (
            <div>
            
            </div>
        );
    } else {
        return <img src="./Images/nodata.png" className='DefaultContent' />;
    }
};