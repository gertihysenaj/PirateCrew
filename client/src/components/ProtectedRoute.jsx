import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    React.useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token, navigate]);
    
    return token ? children : null;
};

export default ProtectedRoute;
