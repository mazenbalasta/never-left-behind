import React, { useState, useEffect } from "react";
import { useGetAllActivitiesQuery } from "../app/apiSlice";
import './ActivitiesList.css';


const ActivitiesList = () => {
  const { data: activities = [], isFetching } = useGetAllActivitiesQuery();
  const [postal, setPostal] = useState("");
  const [barList, setBars] = useState([]);


  if (isFetching) return 

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
        <button type="submit">Find Local Breweries</button>
        <p>Zip code: {postal}</p>
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
      <table>
        <thead>
          <tr>
            <th>Activities</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Location</th>
          </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <td>{activity.name}</td>
            <td>{activity.description}</td>
            <td>{activity.start_date}</td>
            <td>{activity.end_date}</td>
            <td>{activity.location}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default ActivitiesList;