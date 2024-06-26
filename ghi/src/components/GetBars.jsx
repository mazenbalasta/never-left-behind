import { useState } from 'react';
import './ActivitiesList.css';

const GetLocalBars = () => {
  const [postal, setPostal] = useState('');
  const [barList, setBars] = useState([]);
  const [noBars, setNoBars] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://api.openbrewerydb.org/breweries?by_postal=${postal}&per_page=3`);
    if (response.ok) {
      const data = await response.json();
      setBars(data);
      setNoBars(data.length === 0);
    }
  }

  return (
    <div className='App-header'>
      <form onSubmit={handleSubmit}>
        <input
          className='input'
          type="text"
          color="gold"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          placeholder="Enter your zip code"
        />
        <button className='Sbtn' type="submit">Find Local Breweries</button>

        <table className='table'>
          <thead className='thead'>
            <tr>
              <th>Name</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {noBars ? (
              <tr>
                <td colSpan="4">No brewery found in your immediate area, new breweries are always being added to our database, so stay tuned!</td>
              </tr>
            ) : (
              barList.map((bar, index) => (
                <tr key={index}>
                  <td>{bar.name}</td>
                  <td>{bar.address_1}</td>
                  <td>{bar.city}</td>
                  <td>{bar.state_province}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default GetLocalBars;
