import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './PublicRsvpPage.css';

function PublicRsvpPage() {
  const { eventId } = useParams();
  const location = useLocation();

  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

  // Get event details
  useEffect(() => {
    axios.get(`https://eventifybackend.onrender.com/api/events/${eventId}`)
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error(err);
        setMessage({ type: 'error', text: 'Failed to load event details.' });
      });
  }, [eventId]);

  // Prefill email from URL (optional)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const prefillEmail = queryParams.get('email');
    if (prefillEmail) {
      setEmail(prefillEmail);
    }
  }, [location]);

  // Submit RSVP
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    axios.post('https://eventifybackend.onrender.com/api/events/rsvp', {
      eventId: eventId,
      name: name,
      email: email
    }).then(() => {
      setMessage({ type: 'success', text: 'Thank you for your RSVP!' });
      setIsSubmitting(false);
      setName('');
      setEmail('');
    }).catch(err => {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to submit RSVP. Please try again.' });
      setIsSubmitting(false);
    });
  };

  // Format date and time from startTime and endTime
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
  const formatTime = (dateStr) => new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (message && message.type === 'success') {
    return (
      <div className="rsvp-page-container">
        <div className="rsvp-card submitted">
          <p className="submitted-message">Thank you for your RSVP!</p>
          <p className="submitted-subtext">We look forward to seeing you there.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rsvp-page-container">
      {event ? (
        <div className="rsvp-card">
          {/* Left Side: Event Details */}
          <div className="event-details-section">
            <h1 className="event-title">{event.title}</h1>
            <p className="event-description">{event.description}</p>
            <div className="event-info">
              <p>🗓️ <strong>Date:</strong> {formatDate(event.startTime)}</p>
              <p>⏰ <strong>Time:</strong> {formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
              <p>📍 <strong>Location:</strong> {event.location}</p>
            </div>
            <div className="event-illustration">
              <img 
                src="https://placehold.co/300x250/ffffff/4c1d95?text=Event+Details" 
                alt="Event Illustration" 
                className="illustration-image" 
              />
            </div>
          </div>

          {/* Right Side: RSVP Form */}
          <div className="rsvp-form-section">
            <h2 className="form-heading">RSVP to this Event</h2>
            <form onSubmit={handleSubmit} className="rsvp-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="loading-card">
          <p className="loading-message">Loading event details...</p>
        </div>
      )}

      {/* Custom Message Box for errors */}
      {message && message.type === 'error' && (
        <div className={`message-box ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="close-message-button">
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default PublicRsvpPage;
