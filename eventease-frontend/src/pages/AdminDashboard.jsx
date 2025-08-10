import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDeleteId, setEventToDeleteId] = useState(null);
  const [message, setMessage] = useState('');

  // Invite modal states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:8080/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteClick = (id) => {
    setEventToDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    setShowConfirmModal(false);
    if (!eventToDeleteId) return;

    try {
      await axios.delete(`http://localhost:8080/api/events/${eventToDeleteId}`);
      setMessage('Event deleted successfully!');
      fetchEvents();
    } catch (err) {
      console.error('Failed to delete event:', err);
      setMessage('Error: Could not delete event.');
    } finally {
      setEventToDeleteId(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleInviteClick = (event) => {
    setSelectedEvent(event);
    setShowInviteModal(true);
  };

  const handleSendInvite = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const eventDate = new Date(selectedEvent.startTime).toLocaleDateString();
    const eventStart = new Date(selectedEvent.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setSending(true);
    try {
      await axios.post('http://localhost:8080/api/email/send', {
        eventId: selectedEvent.id,
        to: email,
        subject: `You're Invited: ${selectedEvent.title}`,
        body: `Hi there,\n\nYou're invited to join "${selectedEvent.title}" happening on ${eventDate} at ${eventStart} in ${selectedEvent.location}.\n\nDetails: ${selectedEvent.description}\n\nThanks,\nEventify`,
      });
      alert('✅ Invite sent successfully!');
      setShowInviteModal(false);
      setEmail('');
      setSelectedEvent(null);
    } catch (err) {
      console.error('❌ Error sending invite', err);
      alert('❌ Failed to send invite.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-content">
        <h2 className="dashboard-title">Admin Event Dashboard</h2>

        {isLoading ? (
          <p className="loading-message">Loading events...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : events.length === 0 ? (
          <p className="no-events-message">No events found.</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="card-content">
                  <h3 className="card-title">{event.title}</h3>
                  <p className="card-detail">
                    <strong>Date:</strong> {new Date(event.startTime).toLocaleDateString()}
                  </p>
                  <p className="card-detail">
                    <strong>Start:</strong> {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="card-detail">
                    <strong>End:</strong> {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="card-detail"><strong>Location:</strong> {event.location}</p>
                  <p className="card-detail"><strong>Description:</strong> {event.description}</p>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleInviteClick(event)}
                    className="invite-button"
                  >
                    Invite
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this event?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="modal-button confirm">Yes, Delete</button>
              <button onClick={() => setShowConfirmModal(false)} className="modal-button cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Invite modal */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Invite to: {selectedEvent?.title}</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="modal-input"
            />
            <div className="modal-actions">
              <button
                onClick={() => {
                  setShowInviteModal(false);
                  setEmail('');
                  setSelectedEvent(null);
                }}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                disabled={sending}
                className={`modal-button confirm ${sending ? 'disabled' : ''}`}
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message box */}
      {message && (
        <div className={`message-box ${message.startsWith('Error') ? 'error' : 'success'}`}>
          {message}
          <button onClick={() => setMessage('')} className="close-message-button">
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
