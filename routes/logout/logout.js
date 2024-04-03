const express = require('express');
const router = express.Router();

// 로그아웃 라우트
router.post('/logout', (req, res) => {
    // 세션 제거
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ success: false, message: '세션 제거 중 오류가 발생했습니다.' });
        }
        // 클라이언트 측에서 토큰을 제거하기 위해 클라이언트에게 응답을 보냅니다.
        res.clearCookie('accessToken'); // 쿠키에서 토큰 제거
        res.status(200).json({ success: true, message: '로그아웃 되었습니다.' });
    });
});

module.exports = router;
