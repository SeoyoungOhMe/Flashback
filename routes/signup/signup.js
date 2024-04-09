const express = require('express');
const bcrypt = require('bcrypt');
const pg = require('pg');

const router = express.Router();
const saltRounds = 10;

//dbconfig에서 db연결
const dbconfig = require('../../config/dbconfig.json');

const db = new pg.Client({
    user: dbconfig.user,
    host: dbconfig.host,
    database: dbconfig.database,
    password: dbconfig.password,
    port: dbconfig.port,
  });
  db.connect();

//회원가입 /signup
router.post('/', async(req, res) => {
    const { nickname, id, password } = req.body;

    //nickname, id, passowrd 3개가 중 하나라도 입력하지 않은 경우
    if (!nickname || !id || !password) {
        return res.status(400).json({ success: false, message: '닉네임, 아이디, 비밀번호를 모두 입력해주세요.' });
    }

    try {
        ////nickname, id, passowrd 3개가 다 일치하는 사용자가 db에 이미 존재하는 경우          
        const result = await db.query('SELECT * FROM member WHERE nickname = $1 AND id = $2 AND password = $3', [nickname, id, password]);
        if (result.rows.length > 0) {
            return res.status(400).json({ success: false, message: '이미 존재하는 사용자입니다.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // DB에 회원 정보 저장
        await db.query('INSERT INTO member (nickname, id, password) VALUES ($1, $2, $3)', [nickname, id, hashedPassword]);
    
        res.status(201).json({ success: true, message: '회원가입에 성공했습니다.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: '회원가입 중 오류가 발생했습니다.' });
    }

});

module.exports = router;

