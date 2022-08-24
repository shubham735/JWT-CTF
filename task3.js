// This task has none alg

const express = require('express');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const cookieParser = require('cookie-parser');
const { options } = require('sanitize-html');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const secret = 'thisIsSuperSecretKeyAndThisShouldNotbeDisclosed'
const flag = 'we45{flag_for_task3_280797}';

app.get('/',(req, res)=>{
    res.render('login')
})

app.get('/home',(req,res)=>{
    option={
        algorithms:['none','HS256']
    }
    var data=jwt.verify(req.cookies.token_for_task3,'',option)
    if (data.role=='admin') {
        var message='Yayy!! You got the flag   #'+flag
        var role='admin'
        var name=data.name
        res.render('user',{message:message,role:role, name:name})
    } else if (data.role=='user') {
        var message='Try tampering JWT Token to get flag on admin account.'
        var role='user'
        var name=data.name
        res.render('user',{message:message,role:role, name:name})
    } else{
        res.render('login')
    }
})

app.post('/home',(req, res)=>{
    username=sanitizeHtml(req.body.username)
    password=sanitizeHtml(req.body.password)
    if (username=='Alex' && password=='1234') {
        var data={
            'name':username,
            'role':'user'
            }
        var token = jwt.sign(data, secret);
        res.cookie('token_for_task3',token)
        res.render('user',{user:username})
    } else {
        res.render('login')
    }
    
})

app.listen(3003);