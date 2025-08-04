// PublicRsvpPage.jsx
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';


function PublicRsvpPage() {
  const { eventId } = useParams();
  const location = useLocation();

  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ✅ Get event details
  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${eventId}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [eventId]);

  // ✅ Prefill email from URL (optional)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const prefillEmail = queryParams.get('email');
    if (prefillEmail) {
      setEmail(prefillEmail);
    }
  }, [location]);

  // ✅ Submit RSVP
  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/events/rsvp', {
      eventId: eventId,
      name: name,
      email: email
    }).then(() => setSubmitted(true))
      .catch(err => console.error(err));
  };

  if (!event) return <p>Loading event details...</p>;
  if (submitted) return <p>Thank you for your RSVP!</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <h3>RSVP</h3>
      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />
      <input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <button onClick={handleSubmit}>Submit RSVP</button>
    </div>
  );
}

export default PublicRsvpPage;
  