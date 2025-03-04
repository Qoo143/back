//導入express框架
const express = require('express');
//創建express實例
const app = express()

//導入cors (處理跨域請求)
const cors = require('cors');
//全局掛載cors
app.use(cors())

//導入body-parser
const bodyParser = require('body-parser');
//parse application/x-www-form-urlencoded
//extended 為false時，值為數組或字符串、為true時，值可以為任意類型
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json  111112222222
app.use(bodyParser.json())

const loginRouter = require('./router/login')
app.use('/api', loginRouter)


//綁定和監聽指定的端口和主機
app.listen(3007, () => {
  console.log('http://127.0.0.1');
})