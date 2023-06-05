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


const [registerMessage, setRegisterMessage] = useState('');
const [loginMessage, setLoginMessage] = useState('');


const register = (event) => {
    event.preventDefault();

    if(registerState.password !== registerState.confirmPassword) {
        setRegisterMessage('Passwords do not match');
        return;
      }
      if(registerState.firstName === '' || registerState.lastName === '' || registerState.email === '') {
        setRegisterMessage('Please fill out all required fields');
        return;
        }
        if(registerState.password.length < 8) {
        setRegisterMessage('Password should be at least 8 characters long');
        return;
        }
        
        axios.post('http://localhost:8000/api/register', registerState)
        .then(response => {
        setRegisterMessage(response.data.message);

        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

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
    console.log(loginState);
    axios.post('http://localhost:8000/api/login', loginState)
      .then(response => {
        console.log(response.data);

        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        setLoginMessage(response.data.msg);


        setTimeout(() => {
            navigate('/pirates');
          }, 5000);
          
      })
      .catch(err => {
        console.error(err);
  if (err.response && err.response.data) {
    setLoginMessage(err.response.data.msg);
  }
      });
  }

  return (
    <div className="form-container">
      <div className="form-section">
        <h2>Register</h2>
        <form onSubmit={register}>
          <input
            type="text"
            value={registerState.firstName}
            onChange={(e) =>
              setRegisterState({ ...registerState, firstName: e.target.value })
            }
            placeholder="First Name"
          />
          <input
            type="text"
            value={registerState.lastName}
            onChange={(e) =>
              setRegisterState({ ...registerState, lastName: e.target.value })
            }
            placeholder="Last Name"
          />
          <input
            type="email"
            value={registerState.email}
            onChange={(e) =>
              setRegisterState({ ...registerState, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="password"
            value={registerState.password}
            onChange={(e) =>
              setRegisterState({ ...registerState, password: e.target.value })
            }
            placeholder="Password"
          />
          <input
            type="password"
            value={registerState.confirmPassword}
            onChange={(e) =>
              setRegisterState({
                ...registerState,
                confirmPassword: e.target.value
              })
            }
            placeholder="Confirm Password"
          />
          <button type="submit">Register</button>
        </form>
        <div>
          <p>{registerMessage}</p>
        </div>
      </div>
      <div className="form-section">
        <h2>Login</h2>
        <form onSubmit={login}>
          <input
            type="email"
            value={loginState.email}
            onChange={(e) =>
              setLoginState({ ...loginState, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="password"
            value={loginState.password}
            onChange={(e) =>
              setLoginState({ ...loginState, password: e.target.value })
            }
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <div>
          <p>{loginMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
