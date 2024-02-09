import { useGetAllActivitiesQuery } from '../app/apiSlice'
import { useGetTokenQuery } from '../app/apiSlice'
import { Link } from 'react-router-dom'
import './ActivitiesList.css'

const ActivitiesList = () => {
    const { data: activities = [] } = useGetAllActivitiesQuery()
    const { data: token } = useGetTokenQuery()

    return (
        <div className="App-header">
            {token && (
                <button className="Sbtn" type="button">
                    <Link to="/activitiesForm">Add Activity</Link>
                </button>
            )}
            <h4 className="h4">Find an Activity</h4>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>Activities</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {activities.map((activity) => (
                        <tr key={activity.id}>
                            <td>{activity.name}</td>
                            <td>{activity.category.name}</td>
                            <td>{activity.description}</td>
                            <td>{activity.start_date}</td>
                            <td>{activity.end_date}</td>
                            <td>{activity.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ActivitiesList
