const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: [
      'http://localhost:8080', // For local development
      'https://scicluna.github.io' // Replace 'yourusername' with your actual GitHub username
    ],
    credentials: true
  }));
  
  async function startServer() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: false });
      console.log('Connected to MongoDB');
  
      const highScoreSchema = new mongoose.Schema({
        score: Number,
        initials: { type: String, max: 3 }
      });
  
      const HighScore = mongoose.model('HighScore', highScoreSchema, 'highscores');
  
      app.get('/api/highscores', async (req, res) => {
        const highScores = await HighScore.find().sort({ score: -1 }).limit(10);
        res.json(highScores);
      });
  
      app.post('/api/highscores', async (req, res) => {
        const { score, initials } = req.body;
  
        const newHighScore = new HighScore({ score, initials });
        await newHighScore.save();
  
        res.status(201).json(newHighScore);
      });
  
      app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
      });
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  }
  
  startServer();