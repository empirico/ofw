var ctrl_home = {

	init: function(cb) {
		
		$$("#create-event").on('click', ctrl_event.init);
		var tasks = [	
				function(cback){
					ofwEvent.getAll({
						url: ofwConfig.webservice + "/events_nearby.json", 
						target: $("#home-tab-nearby-ofws ul"),
						callback: cback,
						template: function() { return ofwConfig.templates.event_item; }
					});
				},
				function(cback){
						ofwEvent.getAll({
							url: ofwConfig.webservice + "/events_friends.json", 
							target: $("#home-tab-friends-ofws ul"),
							callback: cback,
							template: function() { return ofwConfig.templates.event_item; }
						})
					}
				];

		async.parallel(tasks, function() {
			console.log("events loaded");
			cb(null);
			$("#home-events-tabs").removeClass("loading");
		});
	}

}