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
        <div>
            <h1 className="fw-bold shadow w-25 p-3 mb-5 bg-white rounded">Events</h1>
            <table className="hover:table-fixed mx-5">
                <thead>
                    <tr className="mx-5">
                        <th className="fs-3 px-4" scope="col">Event Title</th>
                        <th className="fs-3 px-4" scope="col">Start Date</th>
                        <th className="fs-3 px-4" scope="col">End Date</th>
                        <th className="fs-3 px-4" scope="col">Description</th>
                        <th className="fs-3 px-4" scope="col">City</th>
                        <th className="fs-3 px-4" scope="col">State</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr
                            className={`table-auto ${selectedEvent === event ? "bg-blue-200" : ""}`}
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                        >
                            <td className="px-4 py-2">{event.event_title}</td>
                            <td className="px-4 py-2">{event.start_date}</td>
                            <td className="px-4 py-2">{event.end_date}</td>
                            <td className="px-4 py-2">{event.description}</td>
                            <td className="px-4 py-2">{event.city}</td>
                            <td className="px-4 py-2">{}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedEvent && (
                <div>
                    <h2>Selected Event Details:</h2>
                    <p>Event Title: {selectedEvent.event_title}</p>
                    <p>Start Date: {selectedEvent.start_date}</p>
                    <p>End Date: {selectedEvent.end_date}</p>
                    <p>Description: {selectedEvent.description}</p>
                    <p>Street Address: {selectedEvent.street_address}</p>
                    <p>City: {selectedEvent.city}</p>
                    <p>State: {}</p>

                    <div/>
                    <div className="d-flex justify-content-start gap-2 ">
                        <button className="btn btn-danger " onClick={handleDeleteClick}>Delete Event</button>
                        <button className="btn btn-warning" onClick={handleUpdateClick}>Update a event</button>
                        <button className="btn btn-primary" onClick={handleResetClick}>Reset</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowEvent;
