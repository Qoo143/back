//連接資料庫
const db = require('../db/index')

//req是前端傳過來的數據，也就是request，res是後端傳來的數據，也就是response
exports.register = (req, res) => {
  //先利用req.body獲取請求體
  const regInfo = req.body

  //1. 判斷"帳號"或"密碼"是否為空
  if (!regInfo.account || regInfo.password) {
    return res.send({
      //以下為自訂屬性
      status: 1,
      message: '帳號或密碼不得為空'
    })
  }

  //2. 檢查帳號是否已經存在於資料庫
  //需要使用MySQL語句
  const sql1 = 'select * from users where account ?'
  //帶入參數(查詢語句, 傳進的請求體.帳號, method)
  //若有查詢到 會有回傳值 並且length>0
  dp.query(sql1, regInfo.account, (err, results) => {
    if (results.length > 0) {
      return res.send({
        //以下為自訂屬性
        status: 1,
        message: '帳號不得重複'
      })
    }
  })

  //3.對密碼進行加密
  //此處使用bcrypt.js 
  //參數(要傳入的參數, 加密後的長度)
  regInfo.password = bcrypt.hashSync(regInfo.password, 10)

  //4.將數據插入資料庫的users表
  //此處插入 ? 代表所有符合規定之資料皆插入
  const sql2 = 'insert into users ?'
  //註冊身分
  const identity = '用戶'
  //註冊時間
  const create_time = new Date()
  dp.query(sql2, ({
    account: regInfo.account,
    password: regInfo.password,
    //身分
    identity,
    //創建時間
    create_time,
    //初始值為0 表示非凍結
    status: 0
    //
  }), (err, results) => {
    //affectedRows 為影響的行數，插入失敗影響行數 = 0
    if (results.affectedRows !== 1) {
      return res.send({
        //以下為自訂屬性
        status: 1,
        message: '創建帳號失敗 '
      })
    }
    res.send({
      //以下為自訂屬性
      status: 1,
      message: '創建帳號成功 '
    })
  })
}

exports.login = (req, res) => {
  res.send('登陸成功')
}