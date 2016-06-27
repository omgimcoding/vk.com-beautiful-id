var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('config');

var vk = require('./routes/vk');

var app = express();

var server = http.createServer(app);
server.listen(config.get('server.port'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: config.get('bodyParser.urlencoded.extended') }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/vk', vk);