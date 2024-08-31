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

    // 요청 헤더에서 userNo를 추출
    const userno = req.headers.userno; // 'userNo' 헤더를 통해 사용자 번호를 받음

    // 사용자 번호가 없으면 에러 반환
    if (!userno) {
        return res.status(400).json({
            success: false,
            message: "사용자 번호가 제공되지 않았습니다."
        });
    }

    const query = `
        SELECT title, author, sentence, sentenceno
        FROM sentences
        WHERE userno = $1
    `;

    try {
        const result = await db.query(query, [userno]);

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
