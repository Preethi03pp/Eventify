// src/pages/RsvpList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RsvpList.css';

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
    <div className="rsvp-list-page">
      <div className="rsvp-container">
        <h2 className="rsvp-title">View RSVPs for Event</h2>

        <div className="form-group">
          <select
            className="event-select"
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
          <button onClick={fetchRsvps} className="fetch-button">
            Fetch RSVPs
          </button>
        </div>

        {rsvps.length > 0 ? (
          <div className="rsvp-list-wrapper">
            {rsvps.map((rsvp, index) => (
              <div className="rsvp-card" key={index}>
                <div className="rsvp-name">{rsvp.name}</div>
                <div className="rsvp-email">{rsvp.email}</div>
              </div>
            ))}
          </div>
        ) : selectedEventId ? (
          <div className="empty-message">No RSVPs found for this event.</div>
        ) : null}
      </div>
    </div>
  );
};

export default RsvpList;
