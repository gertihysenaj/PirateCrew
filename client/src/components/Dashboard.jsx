import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {
  const navigate = useNavigate();

  const [pirates, setPirates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pirates')
      .then(res => setPirates(res.data))
      .catch(err => console.error(err));
  }, []);

  const deletePirate = (id) => {
    axios.delete(`http://localhost:8000/api/pirates/${id}`)
      .then(() => setPirates(pirates.filter(pirate => pirate._id !== id)))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <header className="App-header">
        <h1>Pirate Crew</h1>
        <button onClick={() => navigate("/pirate/new")} style={{ alignSelf: 'flex-end' }}>
          Add Pirate
        </button>
      </header>
    <div>
      <h1>Pirate Crew</h1>
      <button onClick={() => navigate("/pirate/new")} style={{float: 'right'}}>Add Pirate</button>
      {pirates.map(pirate => (
        <div key={pirate._id} className="pirate-card">
          <img src={pirate.imageUrl} alt={pirate.name} className="pirate-img" />
          <div className="pirate-details">
            <h2>{pirate.name}</h2>
            <div className="pirate-actions">
              <Link to={`/pirate/${pirate._id}`}><button>View Pirate</button></Link>
              <button onClick={() => deletePirate(pirate._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Dashboard;
