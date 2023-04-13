import React from 'react';
import { CSVLink } from 'react-csv';

export default function ListButton({all, some, deleteall, deletesome, someData}) {
  return (
    <div>
      <button type="button" className='remove' onClick={deleteall}>Remove All</button>
      <button type="button" className='remove' onClick={deletesome}>Remove</button>
      <CSVLink data={all} filename='All-Stagiaire-Data'>
        <button type="button" className='save'>Save All Data</button>
      </CSVLink>
      <CSVLink data={some} filename='Some-Stagiaire-Data'>
        <button type="button" onClick={someData} className='save'>Save Data</button>
      </CSVLink>
    </div>
  );
};