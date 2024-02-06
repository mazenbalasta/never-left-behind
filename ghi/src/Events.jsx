import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ShowEvent() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [geocodeData, setGeocodeData] = useState(null);

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
        const apiKey = 'prj_live_pk_6357799d3a263ed5010b4abed7177f71b353e94b';
        const getAddress = (event) => {
            const { street_address, city, state } = event;
            const formattedAddress = `${street_address}+${city}+${state.abbreviation}`;
            console.log(formattedAddress);
            const geocodeUrl = `https://api.radar.io/v1/geocode/forward?query=${formattedAddress}`;
            const requestOptions = {
                headers: {
                    Authorization: apiKey
                }
            };
            fetch(geocodeUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setGeocodeData(data);
                    console.log(data);
                })
                .catch(error => console.log(error));
            }
            getAddress(event);
        }

    useEffect(() => {
    Radar.initialize('prj_test_pk_785399a5eb0266150d9be0a637123c0598dee255');
    const map = new Radar.ui.map({
        container: 'map',
        style: 'radar-dark-v1',
        center: [-89.9911, 39.7342],
        zoom: 3.5,
    });

    if (selectedEvent && geocodeData) {
        const { latitude, longitude } = geocodeData.addresses[0];
        map.setCenter([longitude, latitude]);
        map.setZoom(14);
        Radar.ui.marker({ text: selectedEvent.event_title })
            .setLngLat([longitude, latitude])
            .addTo(map);
    }

    map.on('click', (e) => {
        const { lngLat } = e;
        const [longitude, latitude] = lngLat;
        const markerText = 'Clicked Location';
        Radar.ui.marker({ text: markerText })
            .setLngLat([longitude, latitude])
            .addTo(map);
    });
}, [selectedEvent, geocodeData]);


const handleDeleteClick = async () => {
    if (selectedEvent) {
        const eventUrl = `http://localhost:8000/api/events/${selectedEvent.id}/`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(eventUrl, requestOptions);
        if (response.ok) {
            setSelectedEvent(null);
            getEvents();
        } else {
            console.log('error');
        }
    }
}

    return (
        <div className="flex flex-col bg-gray-900 w-screen">
            <button type="button">
                            <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/createEvent">Create Event</Link>
                        </button>
            <div className="shadow-md sm:rounded-lg">
                <div className="flex flex-col">
                    <div className="shadow-md sm:rounded-lg">
                        <h1 className="text-4xl underline font-bold text-white">Events</h1>
                        <h2 className="text-sm Chat-text ml-5 mt-5 font-bold text-white">Event Count: {events.length}</h2>
                        <table className="table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-900 dark:bg-gray-700">
                                    <tr className = "Chat-text">
                                        <th scope="col" className="p-4"></th>

                                        <th scope="col" className="py-3 px-6 text- font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                            Event Title
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                            Start Date
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-left text-gray-400 uppercase dark:text-gray-400">
                                            End Date
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-center text-gray-400 uppercase dark:text-gray-400">
                                            City
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-medium tracking-wider text-center text-gray-400 uppercase dark:text-gray-400">
                                            State
                                        </th>
                                    </tr>
                                </thead>
                                </table>
                        <div className="inline-block overflow-y-scroll w-full max-h-96">
                            <table className="table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-900 dark:bg-gray-700">
                                </thead>
                                {events.map(event => (
                                    <tbody className="bg-gray-700 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        <tr className="hover:bg-gray-600 dark:hover:bg-gray-700" onClick={() => handleEventClick(event)}>
                                            <td className="p-4 w-4">
                                                <div className="flex items-center"></div>
                                            </td>
                                            <td className="py-4 px-6 text-s font-medium text-white text-center whitespace-nowrap dark:text-white">{event.event_title}</td>
                                            <td className="py-4 px-6 text-s font-medium text-white text-right whitespace-nowrap dark:text-white">
                                                {new Date(event.start_date).toLocaleDateString('en-US', {
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    year: 'numeric'
                                                })}{' '}
                                                {new Date(event.start_date).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </td>
                                            <td className="py-4 px-6 text-s font-medium text-white text-center whitespace-nowrap dark:text-white">
                                                {new Date(event.end_date).toLocaleDateString('en-US', {
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    year: 'numeric'
                                                })}{' '}
                                                {new Date(event.end_date).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </td>
                                            <td className="py-4 px-6 text-s font-medium text-white text-right whitespace-nowrap dark:text-white">{event.city}</td>
                                            <td className="py-4 px-6 text-s font-medium text-white text-right whitespace-nowrap dark:text-white">{event.state.state_name}</td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                            </div>
                            <div className="h-5" />
                            <div className="map-container" style={{ height: '55%', position: 'absolute', width: '74%', marginLeft: '500px', padding:'1px' }}>
                                <div id="map" style={{ height: '100%', position: 'absolute', width: '100%' }} />
                            </div>
                            {selectedEvent ? (
                                <div className="Chat-text">
                                    <h2 className="text-2xl text-white font-bold mb-5">Selected Event Details:</h2>
                                    <p className="text-lg text-white mb-5">Event Title: {selectedEvent.event_title}</p>
                                    <p className="text-lg text-white mb-5">Start Date: {new Date(selectedEvent.start_date).toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}{' '}
                                    {new Date(selectedEvent.start_date).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</p>
                                    <p className="text-lg text-white mb-5">End Date: {new Date(selectedEvent.end_date).toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}{' '}
                                    {new Date(selectedEvent.end_date).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</p>
                                    <p className="text-lg text-white mb-5">Description: {selectedEvent.description}</p>
                                    <p className="text-lg text-white mb-5">Street Address: {selectedEvent.street_address}</p>
                                    <p className="text-lg text-white mb-5">City: {selectedEvent.city}</p>
                                    <p className="text-lg text-white mb-5">State: {selectedEvent.state.state_name}</p>

                                    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDeleteClick}>Delete Events</button>

                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-9" />
                                </div>
                            ) : (
                                <body className="bg-gray-900 text-white font-bold text-4xl underline"> Mapping
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-20" />
                                    <div className="h-10" />
                                </body>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default ShowEvent;
