///////////////////////
// OK THIS IS SOMEWHAT MADE TO SEND STUFF OVER SOCKET FROM HURFSTONE?
// WOW
// THIS IS JUST A SHITTY BROADCAST
///////////////////////

var _ = require('lodash');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

server.listen(7162);

io.on('connection', function (socket) {

	socket.on('turn', function (data) {
		socket.broadcast.emit('turn', data);
	});

});
