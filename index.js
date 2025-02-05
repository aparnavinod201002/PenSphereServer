require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/router')
require('./DB/connection')
const blogServer = express()

blogServer.use(cors())

blogServer.use(express.json())
blogServer.use(router)
blogServer.use('/Uploads',express.static('./Uploads'))
const PORT = 3000 || process.env.PORT

blogServer.listen(PORT,()=>{
    console.log(`blog server starting running at port :${PORT}`);
    
})
blogServer.get('/',(reg,res)=>{
    res.send("<h1 style=color:red>blog server started running and waiting for client request.....</h1>")

})