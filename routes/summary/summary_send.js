const express = require('express');
const router = express.Router();

// POST /send-summary - 요약 결과를 프론트엔드로 전송
router.post('/', async (req, res) => {
  try {
    const summaryResult = global.summaryResult;
    res.json(summaryResult);
  } catch (error) {
    console.error('Error sending summary to frontend:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
