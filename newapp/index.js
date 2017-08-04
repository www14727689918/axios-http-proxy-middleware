var express = require('express')
var mysql = require('mysql');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');
// var pool  = mysql.createPool({
//     connectionLimit : 10,
//     host     : process.env.MYSQL_HOST,
//     port     : process.env.MYSQL_PORT,
//     user     : process.env.ACCESSKEY,
//     password : process.env.SECRETKEY,
//     database : 'app_' + process.env.APPNAME,
//
// });
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'kaifanla_new',
    connectionLimit: 3
})
// var connection = mysql.createConnection({
//     host     : process.env.MYSQL_HOST,
//     port     : process.env.MYSQL_PORT,
//     user     : process.env.ACCESSKEY,
//     password : process.env.SECRETKEY,
//     database : 'app_' + process.env.APPNAME,
//     connectionLimit: 3
// })
connection.connect();
var app = express()

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.middleware=[
    proxy(['/page'],{target:'http://www.jeasyui.com/demo/main/datagrid2_getdata.php', changeOrigin: true}),
    proxy(['/main'],{target:'http://www.jeasyui.com/demo', changeOrigin: true})
]
app.use(app.middleware);

app.get('/', function (req, res) {
    res.redirect('index.html')
})
//放借口文件
app.get('/dish',function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    connection.query('SELECT * FROM kf_dish', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results[0]);
        //var results=results;
        response.end("callback"+"("+JSON.stringify(results)+")");
    })
});
app.post('/user',function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    // console.log(request.body);
    var uname=request.body.uname;
    var pwd=request.body.pwd;
    connection.query(`SELECT * FROM kf_users where uname='${uname}' and pwd='${pwd}'`, function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results[0]);
        //var results=results;
        response.end("callback"+"("+JSON.stringify(results)+")");
    })
});
// app.post('/dsf',function (req,res) {
//     res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
//     res.end('11111')
// })
app.listen(process.env.PORT || 5050)
