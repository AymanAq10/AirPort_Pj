import React from 'react';
import Menu from './Menu/Menu';
import Section from './Section/Section';
import './App.css';
import './RespApp.css';
import { Provider } from "react-redux";
import store from './Store/store';

export default function AdminPage({ Element }) {
  return (
    <div id='app'>
      <Provider store={store}>
        <Menu />
        <Section Content={Element} />
      </Provider>
    </div>
  );
};