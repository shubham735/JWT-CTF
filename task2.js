// This task has decode bug

const express = require('express');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const secret = 'thisIsSuperSecretKeyAndThisShouldNotbeDisclosed'
const flag = 'we45{flag_for_task2_140769}';

app.get('/',(req, res)=>{
    res.render('login')
})

app.get('/home',(req,res)=>{
    var data=jwt.decode(req.cookies.token_for_task2)
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
        res.cookie('token_for_task2',token)
        res.render('user',{user:username})
    } else {
        res.render('login')
    }
    
})

app.listen(3002);