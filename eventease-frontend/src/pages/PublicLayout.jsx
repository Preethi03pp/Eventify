// src/pages/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
