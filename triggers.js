////////////////
/// THIS FILE IS ABOUT PEACE & LOVE AND HARMONY
//////////////

(function Triggers(ns) {

	var requestify = require('requestify');
	var _ = require('lodash');
	var cfg = require('./config.json');
	var listener = require('socket.io-client')(cfg.router, {reconnection: 'false'});

	var active_triggers;
	var latch = true;

	listener.on('connect', function(){
		console.log("Connected");
		//listener.emit('register', {production: cfg.production});
		//
		listener.emit('start', {production: cfg.production});
	});

	Triggers.loadTriggers = function() {
		requestify.get(cfg.production_fetch + cfg.production).then(function(response) {
			var parsed = response.getBody();
			active_triggers = parsed.triggers;
			console.log("Updated Triggers");
		});
	}

	Triggers.fire = function (identifier) {
		var trig = _.where(active_triggers, {trigger: cfg.identifiers[identifier].toString()});
		if(latch) {
			listener.emit('commandQueue', {
				command: JSON.parse(trig[0].command)
			});
			console.log(JSON.parse(trig[0].command));
		}
	}

	Triggers.setLatch = function(enable) {
		latch = enable;
		return true;
	}

	Triggers.getLatch = function() {
		return latch;
	}


	ns.Triggers = Triggers;
})(exports);
