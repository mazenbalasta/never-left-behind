import { useState, useEffect } from 'react';


function EventForm() {
    const [eventTitle, setEventTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState([]);
    const [state, setState] = useState('');

    const baseUrl = import.meta.env.VITE_API_HOST


    const handleSubmit = async (event) => {
        event.preventDefault();
        const eventData = {};
        eventData.event_title = eventTitle;
        eventData.start_date = startDate;
        eventData.end_date = endDate;
        eventData.description = description;
        eventData.street_address = streetAddress;
        eventData.city = city;
        eventData.state = state;

        const eventUrl = `${baseUrl}/api/events/`;
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(eventData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(eventUrl, fetchConfig);
        if (response.ok) {
            const newEvent = await response.json();
            setEventTitle('');
            setStartDate('');
            setEndDate('');
            setDescription('');
            setStreetAddress('');
            setCity('');
            setState('');

        } else if (response.status === 400) {
            const error = await response.json();
        }
    }

    const handleEventTitleChange = (event) => {
        setEventTitle(event.target.value);
    }

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleStreetAddressChange = (event) => {
        setStreetAddress(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    const fetchStateData = async () => {
        const stateUrl = `${baseUrl}/api/states/`
        const response = await fetch(stateUrl);
        if (response.ok) {
            const stateData = await response.json();
            setStates(stateData);
        }
    }

    useEffect(() => {
        fetchStateData();
    }, []);

    return (
        <div>
        <div className="bg-[#282c34] relative text-white py-16">
            <h1 className="Chat-text text-4xl text-center font-bold text-white w-screen pb-5">Create an Event!</h1>
            <div className="form mb-20 flex justify-center items-center">
                <form
                    className="w-1/2 bg-gray-900 p-10 rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-lg-light"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-5">
                        <label
                            htmlFor="event-title"
                            className="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                        >
                            Event Title
                        </label>
                        <input
                            type="text"
                            name="event_title"
                            id="event-title"
                            value={eventTitle}
                            onChange={handleEventTitleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="start-date"
                            className="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                        >
                            Start Date
                        </label>
                        <input
                            type="datetime-local"
                            name="start_date"
                            id="start-date"
                            value={startDate}
                            onChange={handleStartDateChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="end-date"
                                    className="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                                >
                                    End Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="end_date"
                                    id="end-date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 h-40 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="street-address"
                                    className="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                                >
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    name="street_address"
                                    id="street-address"
                                    value={streetAddress}
                                    onChange={handleStreetAddressChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-sm font-medium text-gray-50dark:text-white"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={city}
                                    onChange={handleCityChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="state"
                                    className="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                                >
                                    State
                                </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange = {handleStateChange} value={state} required name="state" id="state">
                                <option selected className="text-black">Please select a state</option>
                                {states.map(state => (
                                    <option className="text-black"key={state.state_name} value={state.state_name}>
                                        {state.state_name}
                                    </option>
                                ))}
                            </select>
                    </div>
                    <button
                        type="submit"
                        className="text-white w-1/3 h-1/3 bg-blue-700 mt-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-gray-300 block"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default EventForm;
