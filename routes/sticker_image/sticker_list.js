const express = require('express');
const router = express.Router();

// GET /stickers 경로에 대한 처리
router.get('/stickers', (req, res) => {


    const stickerData = "0x89504E470D0A1A0A..."; // 이진 데이터 형식의 스티커

    if (!stickerData) {
        return res.status(400).json({
            success: false,
            message: "스티커 목록을 가져오는 데 실패했습니다."
        });
    }

    res.status(200).json({
        success: true,
        message: "스티커 목록을 가져오는 데 성공했습니다.",
        data: {
            sticker: stickerData
        }
    });
});

module.exports = router;
