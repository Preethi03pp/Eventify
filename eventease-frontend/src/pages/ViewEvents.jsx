import React, { useEffect, useState } from "react";
import axios from "axios";
import './main.css';


const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("❌ Error fetching events", err);
    }
  };

  const handleInviteClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSendInvite = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    setSending(true);
    try {
      await axios.post("http://localhost:8080/api/email/send", {
        eventId: selectedEvent.id,     
        to: email,
        subject: `You're Invited: ${selectedEvent.title}`,
        body: `Hi there,\n\nYou're invited to join "${selectedEvent.title}" happening on ${selectedEvent.date} at ${selectedEvent.time}.\n\nLocation: ${selectedEvent.location}\n\nDetails: ${selectedEvent.description}\n\nThanks,\nEventEase`,
      });
      alert("✅ Invite sent successfully!");
      setShowModal(false);
      setEmail("");
    } catch (err) {
      console.error("❌ Error sending invite", err);
      alert("❌ Failed to send invite.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>

            <button
              onClick={() => handleInviteClick(event)}
              className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition"
            >
              Invite
            </button>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-[300px]">
            <h2 className="text-lg font-bold mb-2">Invite to: {selectedEvent?.title}</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEmail("");
                }}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                disabled={sending}
                className={`px-3 py-1 rounded text-white ${
                  sending ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEvents;
