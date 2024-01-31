import  { useState, useEffect } from "react";
import { useGetAllCategoriesQuery } from "../app/apiSlice";

function ActivitiesForm() {
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();
  

  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
        
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    category: "",
  });

  const getData = async () => {
    const url = 'http://localhost:8000/api/activities/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setActivities(data.Activities);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:8000/api/activities/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(formData);

    if (!response.ok) {
      console.log('There was an error');
    }

    
    if (response.ok) {
      setFormData({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        category: "",
      });
    }
  }



  const handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  }


  
  
  return (
    <div className="flex flex-col bg-black-100 py-2">
      <div className="p-6 max-w-  bg-gray shadow-md rounded-md">
        <h4 className="font-bold mb-8 text-blue-300">Add an Activity</h4>
        <form onSubmit={handleSubmit} className="space-y-10 hover:bg-red-123">
          <div>
            <label className="block mb-1 text-blue-200">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md text-black hover:bg-blue-100" />
          </div>
          <div>
            <label className="block mb-1 text-blue-200">Description:</label>
          <textarea type="textarea" name="description" value={formData.description} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none text-black hover:bg-blue-100" />
          </div>
          <div>
            <label className="block mb-1 text-blue-200">Start Date:</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md text-black hover:bg-blue-100" />
          </div>
          <div>
            <label className="block mb-1 text-blue-200">End Date:</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md text-black hover:bg-blue-100" />
          </div>
          <div>
            <label className="block mb-1 text-blue-200">Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md text-black hover:bg-blue-100" />
          </div>
          <div>
            <label className="block mb-1 text-blue-200">Category:</label>
            <select name="category" value={formData.category} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md text-black hover:bg-blue-100">
              {categories && categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default ActivitiesForm;
