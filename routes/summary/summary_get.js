const express = require('express');
const axios = require('axios');
const router = express.Router();

const AI_SERVER_URL = process.env.AI_SERVER_URL;

global.summaryResult = {};

// GET /summary-result - AI 서버로부터 요약 결과 가져오기
router.post('/', async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVER_URL}/summarize`);
    global.summaryResult = response.data;
    res.json(response.data);
  } catch (error) {
    console.error('Error getting summary result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
