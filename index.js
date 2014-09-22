///////////////////////
// OK THIS IS SOMEWHAT MADE TO SEND STUFF OVER SOCKET FROM HURFSTONE?
// WOW
// THIS IS JUST A SHITTY BROADCAST
///////////////////////

var _ = require('lodash');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var Triggers = require('./triggers.js').Triggers;
var cfg = require('./config.json');
var active_triggers;

server.listen(7162);

Triggers.loadTriggers();

// BOOOORING BOOORING BOOOOOOORING
// WHATYA DOING GAOEHGOHFFOUHFAO

io.on('connection', function (socket) {

	socket.on('turn', function (data) {
		if(data.turn ==  true)
		{
			Trigger.fire(data.computer);
		}
		socket.broadcast.emit('turn', data);
	});

});
