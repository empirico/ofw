var map;

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

		async.series([
			ofwConfig.load_templates,
			ofw.build_controls,
			ofw.events			
		]);
	},
	build_controls: function(cb) {
		//bind homepage events
		$$("#create-event").on('click', function() {
			$.get("pages/event-create.html", function(create){
				$html = '<div class="popup event-create">' + create + "</div>";
				ofwF7App.popup($html);
				$$(".event-create .close-self").on('click', function(){
					ofwF7App.closeModal('.popup.event-create');
				})
				$$("#event-location").on('click', function() {
					$.get("pages/event-location-search.html", function(location) {
						$html = '<div class="popup event-location">' + location + "</div>";
						ofwF7App.popup($html);
						$$(".event-location .close-self").on('click', function(){
							ofwF7App.closeModal('.popup.event-location');
						})

					});
				})

			});
		});



		cb(null);
		console.log("controls loaded");
	},
	events: function(cb) {

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

var ready_event =  (window.cordova) ? "deviceready" : "ready";
$(document).on(ready_event, ofw.init);
