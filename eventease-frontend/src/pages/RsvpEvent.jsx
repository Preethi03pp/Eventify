// src/pages/RsvpEvent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';


const RsvpEvent = () => {
  const [events, setEvents] = useState([]);
  const [rsvpData, setRsvpData] = useState({
    eventId: '',
    name: '',
    email: ''
  });

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

  const handleChange = (e) => {
    setRsvpData({ ...rsvpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/events/rsvp', rsvpData);
      alert('RSVP submitted successfully!');
      setRsvpData({ eventId: '', name: '', email: '' });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Failed to RSVP');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-bold mb-4 text-center">RSVP to an Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="eventId"
          value={rsvpData.eventId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title} ({event.date})
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={rsvpData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={rsvpData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
};

export default RsvpEvent;
