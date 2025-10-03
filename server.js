const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI and client
const uri = process.env.MONGODB_URI || 'mongodb+srv://borgesdasilvaemanoelly13_db_user:zLicEasDla7a0fTB@checkmentedados.ym3pkhj.mongodb.net/?retryWrites=true&w=majority&appName=CheckMentedados';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('checkmente');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}
connectDB();

// Endpoint to receive desabafo submissions
app.post('/api/desabafar', async (req, res) => {
  try {
    const desabafo = req.body;
    if (!desabafo) {
      return res.status(400).json({ error: 'Dados do desabafo são obrigatórios' });
    }
    desabafo.timestamp = new Date();
    await db.collection('desabafos').insertOne(desabafo);
    console.log('Desabafo salvo:', desabafo);
    res.status(201).json({ message: 'Desabafo salvo com sucesso' });
  } catch (err) {
    console.error('Erro ao salvar desabafo:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Endpoint to receive problem reports
app.post('/api/reportar', async (req, res) => {
  try {
    const report = req.body;
    if (!report) {
      return res.status(400).json({ error: 'Dados do relatório são obrigatórios' });
    }
    report.timestamp = new Date();
    await db.collection('reports').insertOne(report);
    console.log('Relatório salvo:', report);
    res.status(201).json({ message: 'Relatório salvo com sucesso' });
  } catch (err) {
    console.error('Erro ao salvar relatório:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Endpoint to receive emotional check-in
app.post('/api/checkin', async (req, res) => {
  try {
    const checkin = req.body;
    if (!checkin || !checkin.mood) {
      return res.status(400).json({ error: 'Dados do check-in são obrigatórios' });
    }
    checkin.timestamp = new Date();
    await db.collection('checkins').insertOne(checkin);
    console.log('Check-in salvo:', checkin);
    res.status(201).json({ message: 'Check-in salvo com sucesso' });
  } catch (err) {
    console.error('Erro ao salvar check-in:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
