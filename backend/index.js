// Importing Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Renamed parser to bodyParser for clarity
const path = require('path'); // Required for path.join

// Importing Schemas
const Berita = require('../backend/schemas/berita');
const Fauna = require('../backend/schemas/fauna');
const Flora = require('../backend/schemas/flora');

// Initializing Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serving static files from the public directory

// MongoDB Connection using Mongoose
async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://TAHURA:TAHURA123@tahura.cjtoycf.mongodb.net/TAHURA', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to database: TAHURA');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

// Serve Angular App
app.use(express.static(path.join(__dirname, '../dist/tahuraproject')));

// Define Routes
app.get('/api/getFloraDetails/:id', async (req, res) => {
  try {
    const floraId = req.params.id;
    const floraDetails = await Flora.findById(floraId).exec();
    if (!floraDetails) {
      return res.status(404).json({ error: 'Flora not found' });
    }
    res.json(floraDetails);
  } catch (error) {
    console.error('Error fetching flora details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getFaunaDetails/:id', async (req, res) => {
  try {
    const faunaId = req.params.id;
    const faunaDetails = await Fauna.findById(faunaId).exec();
    if (!faunaDetails) {
      return res.status(404).json({ error: 'Fauna not found' });
    }
    res.json(faunaDetails);
  } catch (error) {
    console.error('Error fetching fauna details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getBeritaDetails/:id', async (req, res) => {
  try {
    const beritaId = req.params.id;
    const beritaDetails = await Berita.findById(beritaId).exec();
    if (!beritaDetails) {
      return res.status(404).json({ error: 'Berita not found' });
    }
    res.json(beritaDetails);
  } catch (error) {
    console.error('Error fetching berita details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllFlora', async (req, res) => {
  try {
    const floraData = await Flora.find();
    res.json(floraData);
  } catch (error) {
    console.error('Error fetching flora data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllFauna', async (req, res) => {
  try {
    const faunaData = await Fauna.find();
    res.json(faunaData);
  } catch (error) {
    console.error('Error fetching fauna data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllBerita', async (req, res) => {
  try {
    const beritaData = await Berita.find();
    res.json(beritaData);
  } catch (error) {
    console.error('Error fetching berita data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle all other routes to serve Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/tahuraproject/index.html'));
});

// Server Setup
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
