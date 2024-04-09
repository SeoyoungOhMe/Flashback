var express = require('express');
var app = express();
var router = express.Router();
const bcrypt = require('bcrypt');

var chat_delete = require('./chat/chat_delete.js')
var chat_get = require('./chat/chat_get.js')
var chat_send = require('./chat/chat_send.js')

var login = require('./login/login.js')

var logout = require('./logout/logout.js')

var sentence_delete = require('./sentence/sentence_delete.js')
var sentence_list = require('./sentence/sentence_list.js')
var sentence_read = require('./sentence/sentence_read.js')
var sentence_write = require('./sentence/sentence_write.js')

var signup = require('./signup/signup.js')

var sticker_get = require('./sticker_image/sticker_get.js')
var sticker_list = require('./sticker_image/sticker_list.js')

var mypage = require('./user/mypage.js')
var re_pw = require('./user/re_pw.js')
var user_delete = require('./user/user_delete.js')


// 라우트 연결
router.use('/chat/delete', chat_delete);
router.use('/chat/get', chat_get);
router.use('/chat/send', chat_send);

router.use('/login', login);

router.use('/logout', logout);

// router.use('/sentence/delete', sentence_delete);
router.use('/sentences/:sentence_id', sentence_delete);
// router.use('/sentence/list', sentence_list);
router.use('/sentence', sentence_list);
// router.use('/sentence/read', sentence_read);
router.use('/sentences/:sentence_id/preferences', sentence_read); 
// router.use('/sentence/write', sentence_write);
router.use('/sentences', sentence_write);

router.use('/signup', signup);

router.use('/sticker/get', sticker_get);
router.use('/sticker/list', sticker_list);

router.use('/user/mypage', mypage);
router.use('/user/re_pw', re_pw);
router.use('/user/delete', user_delete);


module.exports = router;