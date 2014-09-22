////////////////
/// THIS FILE IS ABOUT PEACE & LOVE AND HARMONY
//////////////

(function Triggers(ns) {

	var requestify = require('requestify');
	var cfg = require('./config.json');
	var listener = require('socket.io-client')(cfg.router, {reconnection: 'false'});

	var active_triggers;

	listener.on('connect', function(){
		console.log("Connected");
		listener.emit('register', {production: cfg.production});
	});

	Triggers.loadTriggers = function() {
		requestify.get(cfg.production_fetch + cfg.production).then(function(response) {
			var parsed = response.getBody();
			active_triggers = parsed.triggers;
			console.log("Updated Triggers");
			console.log(active_triggers);
		});
	}

	Triggers.fire = function (ident) {
		var trig = _.where(active_triggers, {trigger: cfg.identifiers[ident]})
		listener.emit('commandQueue', {
			command: JSON.parse(trig[0].command)
		});
	}


	ns.Triggers = Triggers;
})(exports);
