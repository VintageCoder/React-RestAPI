import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'; // Import your app.css file
import ListComponent from './components/ListComponent';
import Header from './components/Header';
import FotterComponent from './components/FotterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './components/AddUser';

const App: React.FC = () => {
  return (
    <><BrowserRouter>
      <Header />
      <Routes><Route path='/all' element={<ListComponent />} /></Routes>
      <Routes><Route path='/addUser' element={<AddUser />} /></Routes>
      <Routes><Route path='/update/:id' element={<AddUser />} /></Routes>
      <FotterComponent />
      </BrowserRouter>
    </>
  );
};

export default App;
