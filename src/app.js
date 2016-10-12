import {templates, level} from './es6/level/game';

var express = require('express');
var app = express();

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/templates', function(req, res) {
  res.send(templates);
});

app.get('/level', function(req, res) {
  res.send(level);
});

app.listen(8082);