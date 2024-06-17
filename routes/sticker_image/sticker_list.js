const express = require('express');
const router = express.Router();

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

router.post('/', async (req, res) => {
    const { userno } = req.body;

    if (!userno) {
        return res.status(400).json({ success: false, message: 'User number is required.' });
    }

    try {
        // 사용자의 스티커 목록을 데이터베이스에서 가져오기
        const queryText = 'SELECT * FROM stickers WHERE sentenceno IN (SELECT sentenceno FROM sentences WHERE userno = $1)';
        const dbResponse = await db.query(queryText, [userno]);

        // 스티커 목록 반환
        const stickerList = dbResponse.rows.map(row => row.sticker);
        res.status(200).json({ success: true, stickers: stickerList });
    } catch (error) {
        console.error('Error fetching user stickers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
