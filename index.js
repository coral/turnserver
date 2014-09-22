///////////////////////
// OK THIS IS SOMEWHAT MADE TO SEND STUFF OVER SOCKET FROM HURFSTONE?
// WOW
// THIS IS JUST A SHITTY BROADCAST
///////////////////////

var cfg = require('./config.json');

var _ = require('lodash');
var requestify = require('requestify');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

server.listen(7162);

	requestify.get('http://10.75.254.80/production/get/herffstone').then(function(response) {
		var parsed = response.getBody();
		console.log(parsed.triggers);
	});


io.on('connection', function (socket) {

	requestify.get('http://10.75.254.80/production/get/herffstone').then(function(response) {

	});

	socket.on('turn', function (data) {
		socket.broadcast.emit('turn', data);
	});

});
