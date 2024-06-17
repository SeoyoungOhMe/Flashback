const express = require('express');
const axios = require('axios');
const router = express.Router();

const AI_SERVER_URL = process.env.AI_SERVER_URL;

router.post('/', async (req, res) => {
    const { sentenceno, answer } = req.body;
    console.log("프엔에서 받은 answer : ", answer)

    if (!answer) {
        return res.status(400).json({ success: false, message: 'Answer is required.' });
    }

    // try {
    //     console.log("try 문 들어와서 answer : ", answer)
    //     // AI 서버로 사용자 답변 전송 및 요약 결과 받기
    //     const response = await axios.post(`${AI_SERVER_URL}/answer`, { 
    //         text: answer
    //     });
        
    //     // 요약 결과 응답
    //     res.status(200).json({ success: true, summary: response.data });
    // } catch (error) {
    //     console.error('Error posting user answer to AI server:', error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }

    try {
        console.log("try 문 들어와서 answer : ", answer);
        // AI 서버로 사용자 답변 전송 및 요약 결과 받기
        const response = await axios.post(`${AI_SERVER_URL}/answer`, { 
            text: answer
        });

        // 요약 결과와 워드클라우드 이미지 파일 이름
        const summary = response.data.result;
        const wordcloudUrl = response.data.wordcloud_url;
        
        try {
            // 데이터베이스에 URL 저장
            const insertQuery = 'INSERT INTO stickers (sticker, sentenceno) VALUES ($1, $2)';            
            const dbResponse = await db.query(insertQuery, [wordcloudUrl, sentenceno]);

            // 요약 결과 응답
            res.status(200).json({ 
                success: true, 
                summary: summary, 
                sticker: wordcloudUrl 
            });
        } catch (dbError) {
            console.error('Error saving to database:', dbError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error posting user answer to AI server:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;