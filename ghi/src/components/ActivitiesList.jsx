import React, { useState, useEffect } from "react";
import { useGetAllActivitiesQuery } from "../app/apiSlice";
import './ActivitiesList.css';


const ActivitiesList = () => {
  const { data: activities = [], isFetching } = useGetAllActivitiesQuery();
  const [postal, setPostal] = useState("");
  const [bars, setBars] = useState([]);


  if (isFetching) return <div>Loading...</div>;

  return (

    <div>

      <thead>
        <th>Activities</th>
        <th>Description</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Location</th>


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