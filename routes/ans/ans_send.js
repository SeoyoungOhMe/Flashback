const express = require('express');
const axios = require('axios');
const router = express.Router();

const AI_SERVER_URL = process.env.AI_SERVER_URL;

global.summaryResult  = null;

// POST - 사용자 답변을 AI 서버로 전송
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVER_URL}/summarize`, { 
      text: global.userAnswers
    });
    global.summaryResult = response.data;
    res.json(response.data);
  } catch (error) {
    console.error('Error posting user answer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
