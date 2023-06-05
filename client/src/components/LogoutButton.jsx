import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); 

  const logout = () => {
    axios.post('http://localhost:8000/api/logout')
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <p>
        { user && `Logged in as ${user.firstName} ${user.lastName}`}
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default LogoutButton;

