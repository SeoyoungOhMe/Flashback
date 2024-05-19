const express = require('express');
const router = express.Router();

global.userAnswers = null;

router.post('/', (req, res) => {
    const { sentenceno, answer } = req.body;

    if (!answer) {
        return res.status(400).json({ success: false, message: 'Answer is required.' });
    }

    global.userAnswers = answer;
    res.status(200).json({ success: true, message: 'Answer saved successfully.' });
});

module.exports = router;
