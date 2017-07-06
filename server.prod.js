/**
 * Created by Melon on 2016/10/21.
 */
var path = require('path')
var express = require('express')

var app = express()

app.use(express.static(path.join(__dirname, './'))) //提供静态文件

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './sign/html/login.html'))
})


module.exports=app


