import { useEffect, useState } from "react";

function ShowEvent() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getEvents = async () => {
        const eventsUrl = 'http://localhost:8000/api/events/';
        const response = await fetch(eventsUrl);
        if (response.ok) {
            const eventData = await response.json();

            if (eventData === undefined) {
                return null;
            }

            setEvents(eventData);
        } else {
            console.log('error');
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    }

    const handleResetClick = async () => {
        const eventsUrl = 'http://localhost:8000/api/events/';
        const response = await fetch(eventsUrl);
        if (response.ok) {
            const eventData = await response.json();

            if (eventData === undefined) {
                return null;
            }
            setEvents(eventData.events);
            setSelectedEvent(null);
        }
    }

    const handleDeleteClick = async () => {
        if (selectedEvent) {
            const deleteUrl = `http://localhost:8000/api/events/${selectedEvent.id}`;
            const response = await fetch(deleteUrl, {
                method: 'DELETE'
            });
            const eventsUrl = 'http://localhost:8000/api/events/';
            const responseTwo = await fetch(eventsUrl);
            if (response.ok) {
                const eventData = await responseTwo.json();

                setEvents(eventData.events);
                setSelectedEvent(null);
            }
        }
    }

    const handleUpdateClick = async () => {
        if (selectedEvent) {
            window.location.href = `/events/${selectedEvent.id}`;
        }
    }

    return (
        <div className="flex flex-col bg-gray-900 w-screen">
            <div className="shadow-md sm:rounded-lg"></div>
            <div className="flex flex-col">
                <div className="shadow-md sm:rounded-lg">
                    <div className="inline-block min-w-full">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                            <thead className="bg-gray-900 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="p-4"></th>
                                    <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                        Event Title
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                        Start Date
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                        End Date
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                        Description
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                        City
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                        State
                                    </th>
                                </tr>
                            </thead>
                            {events.map(event => (
                                <tbody className="bg-gray-700 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    <tr className="hover:bg-gray-600 dark:hover:bg-gray-700" onClick={() => handleEventClick(event)}>
                                        <td className="p-4 w-4">
                                            <div className="flex items-center"></div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-white whitespace-nowrap dark:text-white">{event.event_title}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-white whitespace-nowrap dark:text-white">{event.start_date}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-white whitespace-nowrap dark:text-white">{event.end_date}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-white whitespace-nowrap dark:text-white">{event.description}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-white whitespace-nowrap dark:text-white">{event.city}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-white whitespace-nowrap dark:text-white">{event.state.state_name}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                        {selectedEvent && (
                            <div>
                                <h2 className="text-white">Selected Event Details:</h2>
                                <p className="text-white">Event Title: {selectedEvent.event_title}</p>
                                <p className="text-white">Start Date: {selectedEvent.start_date}</p>
                                <p className="text-white">End Date: {selectedEvent.end_date}</p>
                                <p className="text-white">Description: {selectedEvent.description}</p>
                                <p className="text-white">Street Address: {selectedEvent.street_address}</p>
                                <p className="text-white">City: {selectedEvent.city}</p>
                                <p className="text-white">State: {selectedEvent.state.state_name}</p>

                                <div/>
                                <div className="d-flex justify-content-start gap-2 ">
                                    <button className="btn btn-danger text-white" onClick={handleDeleteClick}>Delete Event</button>
                                    <button className="btn btn-warning text-white" onClick={handleUpdateClick}>Update an Event</button>
                                    <button className="btn btn-primary text-white" onClick={handleResetClick}>Reset</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowEvent;
