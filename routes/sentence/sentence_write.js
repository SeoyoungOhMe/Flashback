const express = require('express');
const router = express.Router();
const pg = require('pg');

// 데이터베이스 연결 설정
const db = new pg.Client({
    user: "postgres",
    host: "database-1.cb8gk26msac4.ap-northeast-2.rds.amazonaws.com",
    database: "postgres",
    password: "flashback",
    port: 5432,
});
db.connect();

// POST /sentences 경로에 대한 처리
router.post('/sentences', async (req, res) => {
    const { title, author, sentence } = req.body;

    // 입력 값 검증
    if (!author) {
        return res.status(400).json({
            success: false,
            message: "저자 정보 입력이 필요합니다"
        });
    }

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "책 제목 정보 입력이 필요합니다"
        });
    }

    if (!sentence) {
        return res.status(400).json({
            success: false,
            message: "선호 문장 입력이 필요합니다"
        });
    }

    // PostgreSQL 쿼리를 사용해 sentences 테이블에 데이터 추가
    const query = `
        INSERT INTO sentences(title, author, sentence)
        VALUES($1, $2, $3)
    `;

    try {
        await db.query(query, [title, author, sentence]);
        res.status(200).json({
            success: true,
            message: "문장 등록에 성공했습니다"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "문장 등록에 실패했습니다"
        });
    }
});

module.exports = router;
