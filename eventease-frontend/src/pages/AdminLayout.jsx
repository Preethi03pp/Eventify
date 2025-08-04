// src/pages/AdminLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './main.css';

const AdminLayout = () => {
  return (
    <div>
      <nav className="bg-blue-600 p-4 text-white flex gap-4 justify-center">
        <Link to="/">Home</Link>
        <Link to="/create-event">Create Event</Link>
        <Link to="/events">All Events</Link>
        <Link to="/rsvp">RSVP</Link>
        <Link to="/rsvp-list">RSVP List</Link>
        <Link to="/admin-dashboard">Admin</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
