var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var urlencodedParser = bodyparser.urlencoded({ extended: false});
var mysql=require('mysql');
//var pop = require('popups');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "project"
});

con.connect(function(err){
if(!err) {
    console.log("Database is connected ... ");
} else {
    console.log("Error connecting database ... ");
}
});

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/',urlencodedParser, function(req, res){
  var name = req.body.name;
  var email1 = req.body.email;
  var com = req.body.comments;
  var sql = 'insert into contact values(?,?,?)';
  con.query(sql, [name,email1,com] , function (err, result, fields) {
    if (err) throw err;
    res.redirect('contact-success');
  });
});

app.get('/sign-in', function(req, res){
  res.render('sign-in', {qs: req.query});
});

app.get('/login_home', function(req, res){
  res.render('login_home');
});

app.get('/error', function(req, res){
  res.render('error');
});

app.post('/sign-in',urlencodedParser, function(req, res){
  app.locals.email = req.body.email;
  var emails=req.body.email;
  var pass=req.body.password;
  con.query("SELECT * FROM data where email='"+emails+"';", function (err, result, fields) {
    if (err) throw err;
//S    var data = JSON.parse(JSON.stringify(result));

    if(result.length>0)
    {
      if(result[0].password==pass)
      {
        app.locals.first = result[0].first;
        app.locals.last = result[0].last;
        app.locals.age = result[0].age;
        app.locals.gender = result[0].gender;
        app.locals.country = result[0].country;
        app.locals.state = result[0].state;
        app.locals.zip = result[0].zip;
        app.locals.mobileno = result[0].mobileno;
        res.redirect('/profile');
      // res.redirect('/profile');
      }
      else {
        res.redirect('/error');
      }
    }


  });
});


app.get('/sign-up', function(req, res){
  res.render('sign-up');
});

app.post('/sign-up',urlencodedParser, function(req, res){
  var first = req.body.first;
  var last = req.body.last;
  var age = req.body.age;
  var gender = req.body.optradio;
//  var dob = req.body.dob;
  var country = req.body.country;
  var state = req.body.state;
  var zip = req.body.zip;
  var mobno = req.body.mobileno;
  var email=req.body.email;
  var password=req.body.password;
  var sql = 'insert into data values(?,?,?,?,?,?,?,?,?,?)';
  con.query(sql,[first,last,age,gender,country,state,zip,mobno,email,password] , function (err, result, fields) {
    if (err) throw err;
    res.redirect('sign-up-ok');
  });
});

app.get('/profile', function(req, res){
  res.render('profile');
});

//app.get('/profile:email', function(req, res){
  //res.render('profile', {qs : emails});
//});

app.get('/spot_1', function(req, res){
  res.render('spot_1');
});

app.get('/spot_2', function(req, res){
  res.render('spot_2');
});

app.get('/sign-up-ok', function(req, res){
  res.render('sign-up-ok');
});

app.post('/sign-up', function(req, res){
  res.redirect('/profile');
});

app.get('/listing', function(req, res){
  res.render('listing');
});

app.get('/contact-success', function(req, res){
  res.render('contact-success');
});

app.listen(3000);
