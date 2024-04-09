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

// GET /sentences/{sentence_id}/preferences 경로에 대한 처리
router.get('/sentences/:sentence_id/preferences', async (req, res) => {
    const sentenceNo = parseInt(req.params.sentence_id);

    if (!Number.isInteger(sentenceNo)) {
        return res.status(400).json({
            success: false,
            message: "문장 번호가 올바르지 않습니다."
        });
    }

    // PostgreSQL 쿼리를 사용하여 선호하는 문장의 이유를 가져옴
    const query = `
        SELECT reason
        FROM preferences
        WHERE sentenceNo = $1
    `;

    try {
        const result = await db.query(query, [sentenceNo]);

        if (result.rows.length > 0) {
            // 문장의 선호 이유를 성공적으로 가져온 경우
            res.status(200).json({
                success: true,
                message: "문장 선호 이유를 가져오는 데 성공했습니다.",
                preferences: result.rows.map(row => row.reason)
            });
        } else {
            // 해당 문장에 대한 선호 이유가 없는 경우
            res.status(404).json({
                success: false,
                message: "해당 문장에 대한 선호 이유가 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "문장 선호 이유를 가져오는 데 실패했습니다."
        });
    }
});

module.exports = router;
