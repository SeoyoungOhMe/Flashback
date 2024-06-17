const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (global.questions.length === 0) {
        return res.status(400).json({ success: false, message: 'Questions have not been generated. Please call the /generate-questions endpoint first.' });
    }

    if (global.currentIndex >= global.questions.length) {
        return res.status(200).json({ success: false, message: 'All questions have been provided.' });
    }

    const question = global.questions[global.currentIndex];
    global.currentIndex++;
    res.status(200).json({ success: true, question });
});

module.exports = router;
