var express = require('express');
var app = express();
var router = express.Router();
const bcrypt = require('bcrypt');

var chat_delete = require('./chat/chat_delete.js')
var ques_make = require('./chat/ques_make.js')
var ques_send = require('./chat/ques_send.js')

var login = require('./login/login.js')

var logout = require('./logout/logout.js')

var sentence_delete = require('./sentence/sentence_delete.js')
var sentence_list = require('./sentence/sentence_list.js')
var sentence_read = require('./sentence/sentence_read.js')
var sentence_write = require('./sentence/sentence_write.js')

var signup = require('./signup/signup.js')

var sticker_list = require('./sticker_image/sticker_list.js')

var mypage = require('./user/mypage.js')
var re_pw = require('./user/re_pw.js')
var user_delete = require('./user/user_delete.js')

var ans_combine = require('./ans/ans_combine.js')

router.use('/chat', chat_delete); 
router.use('/chat', ques_make); 
router.use('/chat', ques_send); 

router.use('/login', login);

router.use('/logout', logout);

router.use('/sentences', sentence_delete); 
router.use('/sentences', sentence_list); 
router.use('/sentences/:sentence_id/preferences', sentence_read); 
router.use('/sentences', sentence_write); 

router.use('/signup', signup);

router.use('/sticker', sticker_list);

router.use('/users', mypage);
router.use('/users', re_pw);
router.use('/users', user_delete);

router.use('/combine', ans_combine)

module.exports = router;