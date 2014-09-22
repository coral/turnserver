(function Triggers(ns) {

	var requestify = require('requestify');

	var active_triggers;

	Triggers.loadTriggers = function() {
		console.log("ok");
		requestify.get('http://10.75.254.80/production/get/herffstone').then(function(response) {
			var parsed = response.getBody();
			active_triggers = parsed.triggers;
			console.log("Updated Triggers");
		});
	}

	ns.Triggers = Triggers;
})(exports);
