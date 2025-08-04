// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/events/${id}`);
      alert('Event deleted!');
      fetchEvents(); // refresh
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Event Dashboard</h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border px-4 py-2">{event.title}</td>
                <td className="border px-4 py-2">{event.date}</td>
                <td className="border px-4 py-2">{event.location}</td>
                <td className="border px-4 py-2 flex gap-2">
                  {/* Optional Edit Button */}
                  {/* <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button> */}
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
