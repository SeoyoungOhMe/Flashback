const express = require('express');
const pg = require('pg');
const session = require('express-session');
const dbconfig = require('../../config/dbconfig.json');

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

// Express session middleware setup
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// DELETE /users/:userId 경로에 대한 처리
router.delete('/', async (req, res) => {
  const userId = req.params.userId;

  try {
    // 데이터베이스에 존재하는 회원인지 확인 후 
    const userCheckQuery = 'SELECT * FROM users WHERE id = $1';
    const userCheckResult = await db.query(userCheckQuery, [userId]);
    if (userCheckResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }

    // 회원 정보 삭제
    const deleteUserQuery = 'DELETE FROM users WHERE id = $1';
    await db.query(deleteUserQuery, [userId]);

    // 세션 삭제
    req.session.destroy();

    res.status(200).json({ success: true, message: '회원 탈퇴에 성공했습니다.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: '회원 탈퇴에 실패했습니다.' });
  }
});

module.exports = router;
