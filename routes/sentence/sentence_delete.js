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

// DELETE /sentences/{sentence_id} 경로에 대한 처리
router.delete('/sentences/:sentence_id', async (req, res) => {
    const sentenceId = parseInt(req.params.sentence_id);

    if (!Number.isInteger(sentenceId)) {
        return res.status(400).json({
            success: false,
            message: "문장 번호가 올바르지 않습니다."
        });
    }

    // PostgreSQL 쿼리를 사용하여 특정 문장을 삭제
    const query = `
        DELETE FROM sentences
        WHERE id = $1
    `;

    try {
        const result = await db.query(query, [sentenceId]);
        
        if (result.rowCount > 0) {
            // 문장 삭제 성공
            res.json({
                success: true,
                message: "문장을 삭제하는 데 성공했습니다."
            });
        } else {
            // 해당 ID의 문장이 존재하지 않는 경우
            res.status(404).json({
                success: false,
                message: "해당 문장이 존재하지 않습니다."
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "문장을 삭제하는 데 실패했습니다."
        });
    }
});

module.exports = router;