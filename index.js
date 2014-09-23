///////////////////////
/// OK THIS IS SOMEWHAT MADE TO SEND STUFF OVER SOCKET FROM HURFSTONE?
/// WOW
/// THIS IS JUST A SHITTY BROADCAST
///////////////////////

var _ = require('lodash');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var Trigger = require('./triggers.js').Triggers;
var cfg = require('./config.json');

var active_triggers;
var state = {computer: "none"};

server.listen(7162);

Trigger.loadTriggers();

// BOOOORING BOOORING BOOOOOOORING
// WHATYA DOING GAOEHGOHFFOUHFAO

io.on('connection', function (socket) {

	socket.emit('status', {latch: Trigger.getLatch(), state: state});

	socket.on('turn', function (data) {
		if(data.turn ==  true)
		{
			console.log("Fire");
			state = data;
			Trigger.fire(data.computer);

		}
		socket.broadcast.emit('turn', data);
	});

	socket.on('latch', function (data)
	{
		Trigger.setLatch(data.enable);
		socket.emit('status', {latch: Trigger.getLatch(), state: state});
		socket.broadcast.emit('status', {latch: Trigger.getLatch(), state: state});
	});

});
