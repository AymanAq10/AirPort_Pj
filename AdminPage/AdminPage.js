import React from 'react';
import Menu from './Menu/Menu';
import Section from './Section/Section';
import './App.css';
import './RespApp.css';
import { Provider } from "react-redux";
import store from './Store/store';
import { BrowserRouter as Router } from 'react-router-dom';

export default function AdminPage() {
  return (
    <Router>
      <div id='app'>
        <Provider store={store}>
          <Menu />
          <Section />
        </Provider>
      </div>
    </Router>
  );
};