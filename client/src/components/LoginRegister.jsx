import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function LoginRegister() {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginState, setLoginState] = useState({ 
    email: '', 
    password: '' 
});


const [message, setMessage] = useState('');


const register = (event) => {
    event.preventDefault();

    if(registerState.password !== registerState.confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
      if(registerState.firstName === '' || registerState.lastName === '' || registerState.email === '') {
        setMessage('Please fill out all required fields');
        return;
        }
        if(registerState.password.length < 8) {
        setMessage('Password should be at least 8 characters long');
        return;
        }
        
        axios.post('http://localhost:8000/api/register', registerState)
        .then(response => {
        setMessage(response.data.message);
        setTimeout(() => {
        navigate('/pirates');
        }, 5000);
        })
        .catch(err => {
        console.error(err);
        });
        }


  const login = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/login', loginState)
      .then(response => {
        setMessage(response.data.message);


        setTimeout(() => {
            navigate('/pirates');
          }, 5000);
          
      })
      .catch(err => {

        console.error(err);
      });
  }

  return (
    <div>
      <div>
        <h2>Register</h2>
        <form onSubmit={register}>
          <input type="text" value={registerState.firstName} onChange={(e) => setRegisterState({ ...registerState, firstName: e.target.value })} placeholder="First Name" required/>
          <input type="text" value={registerState.lastName} onChange={(e) => setRegisterState({ ...registerState, lastName: e.target.value })} placeholder="Last Name" required/>
          <input type="email" value={registerState.email} onChange={(e) => setRegisterState({ ...registerState, email: e.target.value })} placeholder="Email" required/>
          <input type="password" value={registerState.password} onChange={(e) => setRegisterState({ ...registerState, password: e.target.value })} placeholder="Password" required/>
          <input type="password" value={registerState.confirmPassword} onChange={(e) => setRegisterState({ ...registerState, confirmPassword: e.target.value })} placeholder="Confirm Password" required/>
          <button type="submit">Register</button>
        </form>
      </div>
      <div>
      <div>
        <p>{message}</p>
      </div>
        <h2>Login</h2>
        <form onSubmit={login}>
          <input type="email" value={loginState.email} onChange={(e) => setLoginState({ ...loginState, email: e.target.value })} placeholder="Email" required/>
          <input type="password" value={loginState.password} onChange={(e) => setLoginState({ ...loginState, password: e.target.value })} placeholder="Password" required/>
          <button type="submit">Login</button>
        </form>
      </div>

    </div>
  );
}

export default LoginRegister;