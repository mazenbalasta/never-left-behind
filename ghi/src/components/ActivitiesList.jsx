import React, { useState, useEffect } from "react";
import { useGetAllActivitiesQuery } from "../app/apiSlice";
import './ActivitiesList.css';


const ActivitiesList = () => {
  const { data: activities = [], isFetching } = useGetAllActivitiesQuery();
  const [postal, setPostal] = useState("");
  const [barList, setBars] = useState([]);


  if (isFetching) return 



  return (

    <div className="App-header">

      <table className="table">
        <thead className="thead">
            <tr>
              <th >Activities</th>
              <th >Description</th>
              <th >Start Date</th>
              <th>End Date</th>
              <th>Location</th>
            </tr >
        </thead>
        <tbody className="tbody">
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.name}</td>
              <td >{activity.description}</td>
              <td >{activity.start_date}</td>
              <td >{activity.end_date}</td>
              <td >{activity.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivitiesList;