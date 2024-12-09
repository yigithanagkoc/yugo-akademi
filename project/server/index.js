import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// CORS ayarları - Netlify URL'ini ekleyin
app.use(cors({
  origin: ['https://yugoakademi.com.tr', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI);

// Model şemaları
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const settingsSchema = new mongoose.Schema({
  type: String,
  data: mongoose.Schema.Types.Mixed
});

const Contact = mongoose.model('Contact', contactSchema);
const Settings = mongoose.model('Settings', settingsSchema);

// API rotaları
app.post('/api/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/settings/:type', async (req, res) => {
  try {
    const settings = await Settings.findOne({ type: req.params.type });
    res.json(settings?.data || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/settings/:type', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { type: req.params.type },
      { type: req.params.type, data: req.body },
      { upsert: true, new: true }
    );
    res.json(settings.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});