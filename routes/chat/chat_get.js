require('dotenv').config();
const express = require('express');
const router = express.Router();
const OpenAI = require("openai")

const openai = new OpenAI({
    apiKey:process.env.OPENAI_KEY_SECRET
})

// POST /api/chat/question 경로에 대한 처리
router.post('/', async (req, res) => {
    // title : 책 제목
    // context : 선호 문장
    // userPrompt : 지피티에게 요청하는 내용

    const {title, context} = req.body;

    // 간단히 실패 상황을 시뮬레이션하기 위해 조건을 만들어봅시다.
    if (!title || !context) {
        return res.status(400).json({
            success: false,
            message: "질문을 받기 위한 제목과 내용이 필요합니다."
        });
    }
    
    // const generatedQuestion = "이 문장이 당신에게 어떤 의미인가요?";
    const userPrompt = `${title} 책의 문장 중 하나인 ${context}를 사용자가 좋아하는 이유를 알 수 있는 질문 10개를 생성해줘.`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": userPrompt }],
            // max_tokens: 100
        });
        console.log(response.choices[0].message.content);
        res.send(response.choices[0].message.content);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "서버 에러가 발생했습니다."
        });
    }
});

module.exports = router;