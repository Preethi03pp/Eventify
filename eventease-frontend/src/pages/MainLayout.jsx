// src/pages/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // You must create this file

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
