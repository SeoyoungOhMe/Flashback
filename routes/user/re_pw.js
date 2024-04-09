const express = require('express');
const bcrypt = require('bcrypt');
const pg = require('pg');
const dbconfig = require('../../config/dbconfig.json');

const router = express.Router();
const saltRounds = 10;

// PostgreSQL database connection setup
const db = new pg.Client({
  user: dbconfig.user,
  host: dbconfig.host,
  database: dbconfig.database,
  password: dbconfig.password,
  port: dbconfig.port,
});
db.connect();

// 비밀번호 변경 PUT /users/:userId/password 경로에 대한 처리
router.put('/users/:userId/password', async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    // 현재 사용자의 정보 데이터베이스에 존재하는 지 확인한고
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }
    // 있다면 현재 비밀번호가 일치하는지 확인하고
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: '현재 비밀번호가 일치하지 않습니다.' });
    }

    // 일치한 경우 새로운 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 회원 테이블에 비밀번호 업데이트
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    // 성공 여부 반환
    res.status(200).json({ success: true, message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: '비밀번호 변경 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
