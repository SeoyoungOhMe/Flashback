const express = require('express');
const router = express.Router();

// POST /api/chat/respond 경로에 대한 처리
router.post('/', (req, res) => {
    const { message } = req.body;

    // 간단히 실패 상황을 시뮬레이션하기 위해 조건을 만들어봅시다.
    if (!message) {
        return res.status(400).json({
            success: false,
            message: "메시지가 없어서 대답을 전송할 수 없습니다."
        });
    }

    res.status(200).json({
        success: true,
        message: "사용자 대답을 전송하는 데 성공했습니다."
    });
});

module.exports = router;
