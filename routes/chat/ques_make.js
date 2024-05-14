require('dotenv').config();
const express = require('express');
const router = express.Router();
const OpenAI = require("openai")

const openai = new OpenAI({
    apiKey:process.env.OPENAI_KEY_SECRET
})

global.questions = [];
global.currentIndex = 0;

// POST /api/chat/question 경로에 대한 처리
router.post('/', async (req, res) => {

    //const {title, author, context} = req.body;

    // 간단히 실패 상황을 시뮬레이션하기 위해 조건을 만들어봅시다.
    if (!global.userBookData) {
        return res.status(400).json({
            success: false,
            message: "질문을 받기 위한 제목과 내용이 필요합니다."
        });
    }
    
    // const generatedQuestion = "이 문장이 당신에게 어떤 의미인가요?";
    const userPrompt = `${global.userBookData.author} 작가의 책인 ${global.userBookData.title}의 문장 중 하나인 ${global.userBookData.sentence}를 내가 좋아해. 
    내가 이 문장을 좋아하는 이유를 알고싶어. 좋아하는 이유를 생각해 볼 수 있는 질문 10개를 생성해줘. 
    예를 들어, "이 문장이 당신에게 어떤 감정적 반응을 일으키나요?",
    "이 문장이 당신의 개인적인 경험과 어떻게 연관되어 있나요?",
    "이 문장이 당신에게 어떤 추억이나 사람을 떠올리게 하나요?",
    "이 문장이 당신의 생각이나 태도에 어떤 영향을 미쳤나요?" 
    이런 예시와 같은 질문들을 만들어줘 `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": userPrompt }],
            // max_tokens: 100
        });

        global.questions = response.choices[0].message.content.split('\n').filter(q => q.trim() !== '');
        global.currentIndex = 0; // 인덱스 초기화

        console.log(global.questions);
        res.status(200).json({ 
            success: true, 
            message: '질문이 생성되었습니다.', 
            questions: global.questions 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "서버 에러가 발생했습니다."
        });
    }
});

module.exports = router;