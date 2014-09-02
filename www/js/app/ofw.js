var map;

var ofw_data = {
	loaded_events : [],
	templates : []
};
var ofw = {

	init: function(e){
		
		//e.type = "ready" -> no phonegap
		//e.type = "deviceready" -> phonegap
		//console.log(e);
		//INIT FW7APP
		window.ofwF7App = new Framework7();
		window.$$ = Dom7;
		window.mainView = ofwF7App.addView('.view-main', {
		            // Because we use fixed-through navbar we can enable dynamic navbar
		            dynamicNavbar: true
		});

		async.series( [
			ofwConfig.load_templates,
			ofw.build_controls,
			ofw.events,
			
		]);
	},
	build_controls: function(cb) {
		//bind homepage events
		$$("#create-event").on('click', function() {
			$.get("event-create.html", function(data){
				$html = '<div class="popup">' + data + "</div>";
				ofwF7App.popup($html);

			});
		});

		cb(null);
		console.log("controls loaded");
	},
	event_view: function(eid) {
			$(ofw_data.loaded_events).each(function(i, element){
				if (parseInt(element.id) == parseInt(eid)) {
					var event_view_html = Mustache.render(ofwConfig.templates.event_view, element);
					mainView.loadContent(event_view_html);
					return false;
				}
			});
	},
	events: function(cb) {
		
			var parallel_tasks = [	
				function(cback){
					ofwEvent.getAll({
						url: ofwConfig.webservice + "/events_nearby.json", 
						target: $("#home-tab-nearby-ofws ul"),
						callback: cback,
						template: ofwConfig.event_item
					});
				},
				function(cback){
						ofwEvent.getAll({
							url: ofwConfig.webservice + "/events_friends.json", 
							target: $("#home-tab-friends-ofws ul"),
							callback: cback,
							template: ofwConfig.event_item
						})
					}
				];

			async.parallel(parallel_tasks, function() {
					console.log("events loaded");
					cb(null);
					$("#home-events-tabs").removeClass("loading");
			});
	}
}

var ready_event =  (window.cordova) ? "deviceready" : "ready";
$(document).on(ready_event, ofw.init);
