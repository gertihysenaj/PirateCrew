import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import AddPirate from './components/AddPirate';
import PirateDetails from './components/PirateDetails';
import LoginRegister from './components/LoginRegister';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/pirates" element={<Dashboard />} />
          <Route path="/pirate/new" element={<AddPirate />} />
          <Route path="/pirate/:id" element={<PirateDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

