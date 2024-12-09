import axios from 'axios';

const baseURL = import.meta.env.PROD 
  ? 'https://yugo-akademi-backend.onrender.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({ 
  baseURL,
  withCredentials: true
});

export const getContacts = () => api.get('/contacts');
export const createContact = (data: any) => api.post('/contacts', data);
export const updateContactStatus = (id: string, status: string) => 
  api.patch(`/contacts/${id}`, { status });

export const getSettings = (type: string) => api.get(`/settings/${type}`);
export const updateSettings = (type: string, data: any) => 
  api.post(`/settings/${type}`, data);