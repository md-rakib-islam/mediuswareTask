import { Routes, Route } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Index from "./components/Index.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllContacts from './components/Modal.jsx';
import UsContacts from './components/Modal.jsx';
import React, { useState } from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2" element={<Problem2 />} />
          <Route path="all-contacts" element={<AllContacts contacts={'all_contracts'} name={'All Contacts'} />} />
          <Route path="us-contacts" element={<UsContacts contacts={'us_contracts'} name={'US Contacts'}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
