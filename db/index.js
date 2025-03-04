//引入數據庫
const mysql = require('mysql')
//連接數據庫
const db = mysql.createPool({
  host: '',
  user: '',
  password: '',
  database: '',
})
//對外暴露數據庫
module.exports = db