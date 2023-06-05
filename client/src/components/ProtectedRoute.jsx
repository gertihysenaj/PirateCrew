import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddPirate from './AddPirate';
import PirateDetails from './PirateDetails';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token ? (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pirate/new" element={<AddPirate />} />
      <Route path="/pirate/:id" element={<PirateDetails />} />
    </Routes>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
