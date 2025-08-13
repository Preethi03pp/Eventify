// src/pages/CreateEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date + start time & end time into ISO format
    const startDateTime = `${formData.date}T${formData.startTime}:00`;
    const endDateTime = `${formData.date}T${formData.endTime}:00`;

    const eventPayload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      startTime: startDateTime,
      endTime: endDateTime,
      createdBy: "admin" // later: get from logged-in user
    };

    try {
      await axios.post('https://eventifybackend.onrender.com/api/events', eventPayload);
      alert('Event created successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: ''
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="create-event-page">
      <div className="form-container">
        <h2 className="form-title">Create New Event</h2>
        <form onSubmit={handleSubmit} className="form-layout">
          
          <div className="input-group">
            <label htmlFor="title" className="input-label">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Summer Tech Conference"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description" className="input-label">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the event in detail..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="form-textarea"
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="date" className="input-label">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="grid-cols-2-md">
            <div className="input-group">
              <label htmlFor="startTime" className="input-label">Start Time</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="endTime" className="input-label">End Time</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="location" className="input-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Virtual, New York City"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
