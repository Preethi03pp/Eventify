// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateEvent from './pages/CreateEvent';
import RSVPForm from './pages/RsvpEvent';
import RSVPList from './pages/RsvpList';
import PublicRsvpPage from './pages/PublicRsvpPage';
import AdminDashboard from './pages/AdminDashboard';
import PublicLayout from './pages/PublicLayout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import MainLayout from './pages/MainLayout'; // ✅ NEW layout with Navbar

function App() {
  return (
    <Router>
      <Routes>
        {/* ❌ No navbar here */}
        <Route element={<PublicLayout />}>
          <Route path="/rsvpform/:eventId" element={<PublicRsvpPage />} />
        </Route>

        {/* ✅ Navbar for all other routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/rsvp" element={<RSVPForm />} />
          <Route path="/rsvp-list" element={<RSVPList />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
