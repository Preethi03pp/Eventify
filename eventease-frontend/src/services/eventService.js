// src/services/eventService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/events';

export const getAllEvents = async () => {
  return await axios.get(API_BASE_URL);
};

export const createEvent = async (eventData) => {
  return await axios.post(`${API_BASE_URL}/create`, eventData);
};

export const deleteEvent = async (eventId) => {
  return await axios.delete(`${API_BASE_URL}/${eventId}`);
};

export const getEventById = async (eventId) => {
  return await axios.get(`${API_BASE_URL}/${eventId}`);
};

export const updateEvent = async (eventId, updatedData) => {
  return await axios.put(`${API_BASE_URL}/${eventId}`, updatedData);
};
