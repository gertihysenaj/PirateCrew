import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from './LogoutButton';

function AddPirate() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [treasureChests, setTreasureChests] = useState('0');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [crewPosition, setCrewPosition] = useState('');
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);
  const [errors, setErrors] = useState(null);

  const addPirate = (event) => {
    console.log('AddPirate component loaded');
    event.preventDefault();

    const newPirate = {
      name,
      imageUrl,
      treasureChests,
      catchPhrase,
      crewPosition,
      pegLeg,
      eyePatch,
      hookHand
    };

    axios.post('http://localhost:8000/api/pirates', newPirate)
      .then(() => navigate("/pirates"))
      .catch(err => {
        console.error(err);
        setErrors(err.response.data.errors);
      });
  }

  return (
    <div>
      <h1>Add Pirate</h1>
      <Link to="/pirates"><button>Crew Board</button></Link>
      <LogoutButton />
      <form onSubmit={addPirate}>
        <label>Pirate Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors && errors.name && <p>{errors.name.message}</p>}

        <label>Image Url:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        {errors && errors.imageUrl && <p>{errors.imageUrl.message}</p>}

        <label># of Treasure Chests:</label>
        <input type="number" value={treasureChests} onChange={(e) => setTreasureChests(e.target.value)} />
        {errors && errors.treasureChests && <p>{errors.treasureChests.message}</p>}

        <label>Pirate Catch Phrases:</label>
        <input type="text" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} />
        {errors && errors.catchPhrase && <p>{errors.catchPhrase.message}</p>}

        <label>Crew Position:</label>
        <select value={crewPosition} onChange={(e) => setCrewPosition(e.target.value)}>
          <option value="">Select Position</option>
          <option value="Captain">Captain</option>
          <option value="First Mate">First Mate</option>
          <option value="Quarter Master">Quarter Master</option>
          <option value="Boatswain">Boatswain</option>
          <option value="Powder Monkey">Powder Monkey</option>
        </select>
        {errors && errors.crewPosition && <p>{errors.crewPosition.message}</p>}

        <label>Peg Leg:</label>
        <input type="checkbox" checked={pegLeg} onChange={() => setPegLeg(!pegLeg)} />

        <label>Eye Patch:</label>
        <input type="checkbox" checked={eyePatch} onChange={() => setEyePatch(!eyePatch)} />

        <label>Hook Hand:</label>
        <input type="checkbox" checked={hookHand} onChange={() => setHookHand(!hookHand)} />

        <button type="submit">Add Pirate</button>
      </form>

    </div>
  );
}

export default AddPirate;
