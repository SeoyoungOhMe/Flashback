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

// GET /sentences 경로에 대한 처리
router.get('/sentences', async (req, res) => {
    // PostgreSQL 쿼리를 사용하여 모든 문장의 목록을 가져옴
    const query = `
        SELECT title, author, sentence
        FROM sentences
    `;

    try {
        const result = await db.query(query);

        if (result.rows.length > 0) {
            // 문장 목록을 성공적으로 가져온 경우
            res.status(200).json({
                success: true,
                message: "문장 목록을 가져오는 데 성공했습니다.",
                data: result.rows
            });
        } else {
            // 문장 목록이 비어 있는 경우
            res.status(404).json({
                success: true, // 여기서 true를 반환하되, 목록이 비어 있음을 알림
                message: "문장 목록이 비어 있습니다.",
                data: []
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "문장 목록을 가져오는 데 실패했습니다."
        });
    }
});

module.exports = router;
