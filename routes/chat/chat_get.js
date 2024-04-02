const express = require('express');
const router = express.Router();

// POST /api/chat/question 경로에 대한 처리
router.post('/api/chat/question', (req, res) => {
    const { title, context } = req.body;

    // 간단히 실패 상황을 시뮬레이션하기 위해 조건을 만들어봅시다.
    if (!title || !context) {
        return res.status(400).json({
            success: false,
            message: "질문을 받기 위한 제목과 내용이 필요합니다."
        });
    }
    
    const generatedQuestion = "이 문장이 당신에게 어떤 의미인가요?";

    res.status(200).json({
        success: true,
        message: generatedQuestion
    });
});

module.exports = router;
