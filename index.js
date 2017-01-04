var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');
var Hashids = require("hashids");
var hashids = new Hashids("this is a salty hashbrown cooked at a temp of 425F.");

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

app.get('/links/:id', function(req,res){
  db.link.find({
    where: {id: req.params.id},
  })
  .then(function(link){
    var hash = hashids.encode(link.id);
    console.log("Hash is "+hash);
    res.render('links', {hash:hash, link: link});
  });
});

app.get('/:hash', function(req,res){
  console.log(req.params.hash);
  var hash = hashids.decode(req.params.hash);
  console.log("decoded is "+hash);
  db.link.find({
    where: {id: hash},
  })
  .then(function(link){
    console.log(link);
    link.increment('count');
    res.redirect(link.url);
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
