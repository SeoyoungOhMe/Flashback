const express = require('express');
const router = express.Router();

// DELETE /api/chat/session/{session_id} 경로에 대한 처리
router.delete('/delete/:session_id', (req, res) => {
    const sessionId = req.params.session_id;

    if (!sessionId) {
        return res.status(400).json({
            success: false,
            message: "대화 삭제를 위한 세션 ID가 필요합니다."
        });
    }

    res.status(200).json({
        success: true,
        message: "사용자와의 대화를 삭제하는 데 성공했습니다."
    });
});

module.exports = router;
