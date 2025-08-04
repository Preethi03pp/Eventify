// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-4 border">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 mt-1">{event.description}</p>
              <p className="text-sm text-indigo-600 mt-2">
                Date: {event.date} | Time: {event.time}
              </p>
              <p className="text-sm text-gray-500">Location: {event.location}</p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                RSVP
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
