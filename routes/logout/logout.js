const express = require('express');
const router = express.Router();

// 로그아웃 라우트 /logout
router.post('/', (req, res) => {
    if (req.session) { // 세션이 정의되어 있는지 확인
        req.session.destroy(err => { // 세션 제거
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ success: false, message: '세션 제거 중 오류가 발생했습니다.' });
            }
            res.clearCookie('accessToken'); // 쿠키에서 토큰 제거
            res.status(200).json({ success: true, message: '로그아웃 되었습니다.' });
        });
    } else {
        res.status(200).json({ success: false, message: '세션을 찾을 수 없습니다.' });
    }
});

module.exports = router;
