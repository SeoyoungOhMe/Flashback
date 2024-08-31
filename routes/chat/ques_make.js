require('dotenv').config();
const express = require('express');
const router = express.Router();
const OpenAI = require("openai")
const pg = require('pg');
const dbconfig = require('../../config/dbconfig.json');

const db = new pg.Client({
    user: dbconfig.user,
    host: dbconfig.host,
    database: dbconfig.database,
    password: dbconfig.password,
    port: dbconfig.port,
});
db.connect();

const openai = new OpenAI({
    apiKey:process.env.OPENAI_KEY_SECRET
})

global.questions = [];
global.currentIndex = 0;

// POST /api/chat/question 경로에 대한 처리
router.post('/', async (req, res) => {

    const {sentenceno} = req.body;

    if (!sentenceno) {
        return res.status(400).json({
            success: false,
            message: "sentenceno 값이 필요합니다."
        });
    }

    const query = `
        SELECT title, author, sentence
        FROM sentences
        WHERE sentenceno = $1;
    `;
    
    try {

        const result = await db.query(query, [sentenceno]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "해당 sentenceno의 데이터를 찾을 수 없습니다."
            });
        }

        const { title, author, sentence } = result.rows[0];

        const userPrompt = `${author} 작가의 책인 ${title}의 문장 중 하나인 ${sentence}를 내가 좋아해. 
        내가 이 문장을 좋아하는 이유를 알고싶어. 좋아하는 이유를 생각해 볼 수 있는 질문 10개를 생성해줘. 
        예를 들어, "이 문장이 당신에게 어떤 감정적 반응을 일으키나요?",
        "이 문장이 당신의 개인적인 경험과 어떻게 연관되어 있나요?"
        이런 예시처럼 심리학적(개인적 동기와 욕구, 정서적 반응) 요인, 
        문화사회적 요인, 
        내용이나 형식적 요인(서사구조와 스토리텔링, 미학적 요소), 
        인지적 요인(인지적 도전과 자극, 상징적 의미와 해석), 
        기술적 요인(혁신적 요인)을 다양하게 고려해서 질문을 만들어줘.`;

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