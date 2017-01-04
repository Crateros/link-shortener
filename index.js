var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');
var Hashids = require("hashids");
var hashids = new Hashids("this is a salty hashbrown");

var app = express();
var db = require("./models");

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts)

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/links', function(req, res){
  console.log(req.body);
  db.link.create(req.body).then(function(link){
    res.redirect('/links/' + link.id);
  });
});

app.get('/links/:id', function(req, res){

})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
