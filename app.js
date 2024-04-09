const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const pg = require('pg')  // import pg from 'pg' 와 동일 (ES6 모듈 -> CommonJS 모듈 사용)
var session = require('express-session')
const dbconfig = require('./config/dbconfig.json')
const bcrypt = require('bcrypt');

const db = new pg.Client({
    user: dbconfig.user,
    host: dbconfig.host,
    database: dbconfig.database,
    password: dbconfig.password,
    port: dbconfig.port,
})
  
db.connect();

app.set('view engine', 'ejs')
app.set('views', './views') // 화면 상에 보여지는 걸 어디서 가져올지 지정

app.use(bodyParser.urlencoded({ extended: false })) // bodyparser 사용을 위함

app.use(express.static(__dirname + '/public')) // 정적 파일 제공

var router = require('./routes/index');

app.use(router);

// // 라우팅 
// app.get('/', (req, res) => {

//     // console.log(req.session.member);

//     res.render('index')  // ./views/index.ejs
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})