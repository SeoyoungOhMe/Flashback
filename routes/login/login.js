const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const session = require('express-session'); // 세션 모듈 불러오기
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

// Express session middleware setup
router.use(session({
  secret: process.env.SESSION_SECRET, // 세션 시크릿 키 설정
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3 * 60 * 60 * 1000 } // 세션의 만료 시간을 3시간으로 설정
}));

// Login route: /login
router.post('/', async (req, res) => {
  const { id, password } = req.body;

  try {
    // 사용자가 id 확인
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: '없는 아이디입니다.' });
    }

    // 사용자 password 확인
    const user = result.rows[0];
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) {
        return res.status(500).json({ success: false, message: '에러 발생' });
      }
      if (!isValid) {
        return res.status(401).json({ success: false, message: '비밀번호가 틀렸습니다' });
      }
      
      // GuserNo를 포함해서 반환하는 access token 생성
      const accessToken = jwt.sign({ userno: user.userno }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

      // 사용자 정보 session에 저장
      req.session.user = user;

      // Return success response with access token
      res.status(200).json({ success: true, accessToken});
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: '에러 발생' });
  }
});

module.exports = router;
