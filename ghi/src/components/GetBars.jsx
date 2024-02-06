import { useState } from 'react';
import './GetBars.css';


const GetLocalBars = () => {
  const [postal, setPostal] = useState('');
  const [barList, setBars] = useState([]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://api.openbrewerydb.org/breweries?by_postal=${postal}&per_page=3`);
    if (response.ok) {
      const data = await response.json();
      setBars(data);
      console.log(data);
    }
 }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          color="gold"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          placeholder="Enter a 5-digit zip code"
        />
        <button className='Subutton' type="submit">Find Local Breweries</button>
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {barList.map((bar, index) => (
              <tr key={index}>
                <td>{bar.name}</td>
                <td>{bar.address_1}</td>
                <td>{bar.city}</td>
                <td>{bar.state_province}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default GetLocalBars;






