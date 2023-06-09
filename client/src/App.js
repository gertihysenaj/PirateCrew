import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddPirate from './components/AddPirate';
import PirateDetails from './components/PirateDetails';
import LoginRegister from './components/LoginRegister';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/pirates/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="new" element={<AddPirate />} />
                <Route path=":id" element={<PirateDetails />} />
              </Routes>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


