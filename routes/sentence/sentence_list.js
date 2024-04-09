const express = require('express');
const router = express.Router();
const pg = require('pg');
const dbconfig = require('../../config/dbconfig.json');

// 데이터베이스 연결 설정
const db = new pg.Client({
    user: dbconfig.user,
    host: dbconfig.host,
    database: dbconfig.database,
    password: dbconfig.password,
    port: dbconfig.port,
});
db.connect();

// GET /sentences 경로에 대한 처리
router.get('/', async (req, res) => { // 원래 : /sentences
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
