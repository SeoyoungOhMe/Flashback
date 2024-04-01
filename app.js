const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const pg = require('pg')  // import pg from 'pg' 와 동일 (ES6 모듈 -> CommonJS 모듈 사용)
var session = require('express-session')

const db = new pg.Client({
    user: "postgres",
    host: "database-1.cb8gk26msac4.ap-northeast-2.rds.amazonaws.com",
    database: "postgres",
    password: "flashback",
    port: 5432,
})
  
db.connect()

app.set('view engine', 'ejs')
app.set('views', './views') // 화면 상에 보여지는 걸 어디서 가져올지 지정

app.use(bodyParser.urlencoded({ extended: false })) // bodyparser 사용을 위함

app.use(express.static(__dirname + '/public')) // 정적 파일 제공

// app.use(session({ secret: 'osy', cookie: { maxAge: 60000 }, resave : true, saveUninitialized : true }))

// app.use((req, res, next) => {

//     res.locals.user_id="";
//     res.locals.name="";

//     if(req.session.member){
//         res.locals.user_id = req.session.member.user_id
//         res.locals.name = req.session.member.name
//     }

//     next()
// })


// 라우팅 
app.get('/', (req, res) => {

    // console.log(req.session.member);

    res.render('index')  // ./views/index.ejs
})



app.post('/add-sentence', async (req, res) => {
    // 클라이언트로부터 받은 데이터 예시
    const sentenceData = {
        userNo: 1, // 예시 값, 실제로는 클라이언트로부터 받아야 합니다.
        title: "우연한 만남",
        author: "투어스",
        sentence: "첫 만남은 너무 어려워."
    };

    // PostgreSQL 쿼리를 사용해 sentences 테이블에 데이터 추가
    const query = `
        INSERT INTO sentences(userNo, title, author, sentence)
        VALUES($1, $2, $3, $4)
    `;

    try {
        await db.query(query, [sentenceData.userNo, sentenceData.title, sentenceData.author, sentenceData.sentence]);
        res.send("문장이 성공적으로 추가되었습니다.");
    } catch (err) {
        console.error(err);
        res.send("문장 추가에 실패했습니다.");
    }
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})