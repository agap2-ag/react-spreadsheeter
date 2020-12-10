import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/main.css';
import SaveForm from './SaveForm';

export default class Spreadsheeter extends Component {
  render() {
    return (
      <>
        <header className="main-header">
          <img src={logo} className="logo" alt="logo" />
          <h1>Spreadsheeter</h1>
          <p>Export and save your data into different file formats</p>
        </header>
        <main>
          <SaveForm btn="Export" fileName="sheet"></SaveForm>
        </main>
      </>
    );
  };
}
