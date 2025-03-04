//登陸註冊模組路由

//先引入express框架
const express = require('express');
//使用express框架之路由
const router = express.Router()

//導入login路由處理模組
const loginHandler = require('../router_handle/login')

router.post('/register', loginHandler.register)
router.post('/login', loginHandler.login)

//將模組暴露出去
module.exports = router