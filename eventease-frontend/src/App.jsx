// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import ViewEvents from './pages/ViewEvents';
import RSVPForm from './pages/RsvpEvent';
import RSVPList from './pages/RsvpList';
import PublicRsvpPage from './pages/PublicRsvpPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from "./pages/AdminLayout";
import PublicLayout from "./pages/PublicLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public RSVP Layout with NO navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/rsvpform/:eventId" element={<PublicRsvpPage />} />
        </Route>
        {/* Admin Layout with Navbar */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events" element={<ViewEvents />} />
          <Route path="/rsvp" element={<RSVPForm />} />
          <Route path="/rsvp-list" element={<RSVPList />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Home Page (can be inside AdminLayout)
const Home = () => (
  <div className="text-center mt-20">
    <h1 className="text-4xl font-bold mb-4">🎉 Welcome to EventEase!</h1>
    <p className="text-lg">Manage and schedule events with ease.</p>
  </div>
);

export default App;
