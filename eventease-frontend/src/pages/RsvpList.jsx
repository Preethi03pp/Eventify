// src/pages/RsvpList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';


const RsvpList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/events')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      });
  }, []);

  const fetchRsvps = async () => {
    if (!selectedEventId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/events/${selectedEventId}/rsvps`);
      setRsvps(res.data);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
      setRsvps([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow border">
      <h2 className="text-2xl font-bold mb-4 text-center">View RSVPs for Event</h2>

      <div className="mb-4 flex items-center gap-2">
        <select
          className="p-2 border rounded w-full"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title} ({event.date})
            </option>
          ))}
        </select>
        <button
          onClick={fetchRsvps}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch RSVPs
        </button>
      </div>

      {rsvps.length > 0 ? (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{rsvp.name}</td>
                <td className="border px-4 py-2">{rsvp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : selectedEventId ? (
        <p className="text-center mt-4 text-gray-500">No RSVPs found for this event.</p>
      ) : null}
    </div>
  );
};

export default RsvpList;
