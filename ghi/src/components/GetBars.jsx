import  { useState } from 'react';

const GetLocalBars = () => {
  const [postal, setPostal] = useState('');
  const [bars, setBars] = useState([]);

  const getLocalBars = async () => {
    const response = await fetch(`https://api.openbrewerydb.org/breweries?by_postal=${postal}&per_page=3`);
    if (response.ok) {
      const data = await response.json();
      setBars(data);
    }
  };

  return (
    <div>
      <input type="text" value={postal} onChange={e => setPostal(e.target.value)} />
      <button onClick={getLocalBars}>Get Local Bars</button>
      {bars.map(bar => (
        <div key={bar.id}>
          <h2>{bar.name}</h2>
          <p>{bar.brewery_type}</p>
          <p>{bar.address_1}</p>
          <p>{bar.city}</p>
          <p>{bar.state}</p>
          <a href={bar.website_url}>Website</a>
        </div>
      ))}
    </div>
  );
};

export default GetLocalBars;