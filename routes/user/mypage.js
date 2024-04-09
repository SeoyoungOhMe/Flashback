const express = require('express');
const pg = require('pg');
const dbconfig = require('../../dbconfig.json');

const router = express.Router();

// PostgreSQL database connection setup
const db = new pg.Client({
  user: dbconfig.user,
  host: dbconfig.host,
  database: dbconfig.database,
  password: dbconfig.password,
  port: dbconfig.port,
});
db.connect();

// 사용자 정보 가져오기 GET /users경로에 대한 처리
router.get('/users', async (req, res) => {
  try {
    // user session이 존재하는지 확인 -> 로그인이 안 된 경우
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: '사용자 세션이 없습니다.' });
    }

    // 데이터베이스에서 회원 정보 가져오기
    const userId = req.session.user.id;
    const result = await db.query('SELECT id, nickname FROM users WHERE id = $1', [userId]);
    
    // 회원 정보가 없는 경우
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }

    // 회원 정보 출력
    const user = result.rows[0];
    res.status(200).json({
      success: true,
      message: '사용자 정보 조회 성공',
      data: {
        id: user.id,
        nickname: user.nickname
      }
    });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ success: false, message: '사용자 정보 조회 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
