const express = require('express');
const router = express.Router();
const axios = require('axios');


// GET /stickers/{sticker_id} 경로에 대한 처리
router.get('/stickers/:sticker_id', (req, res) => {
    const stickerId = req.params.sticker_id;

    if (!stickerId) {
        return res.status(400).json({
            success: false,
            message: "스티커 가져오기를 위한 스티커 ID가 필요합니다."
        });
    }

    const stickerData = "0x89504E470D0A1A0A..."; // 이진 데이터 형식의 스티커

    res.status(200).json({
        success: true,
        message: "스티커 가져오는 데 성공했습니다.",
        data: {
            sticker: stickerData
        }
    });
});

module.exports = router;
