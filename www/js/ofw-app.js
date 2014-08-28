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
			ofw.load_templates,
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
					var event_view_html = Mustache.render(ofw_data.templates.event_view, element);
					mainView.loadContent(event_view_html);
					return false;
				}
			});
	},
	events: function(cb) {
			var load_events = function($url, $target, acallback) {
				$.ajax({
				  dataType: "json",
				  url: $url,
				  success: function(data) {

							$(data).each(function(i, el) {
								item = Mustache.render(ofw_data.templates.event_item, el)
								$item = $(item);
								$item.click( function() {
									ofw.event_view($(this).find(".event-item").data("eid"));
								});
								$target.append($item);
								ofw_data.loaded_events.push(el);
							})

							
							acallback(null, "events-loaded");
						}
				});
			};
		
			var parallel_tasks = [	function(callback){
									load_events("json/events_nearby.json", $("#home-tab-nearby-ofws ul"), callback);
},
									function(callback){
										load_events("json/events_friends.json", $("#home-tab-friends-ofws ul"), callback)
									}
								];

			async.parallel(parallel_tasks, function() {
					console.log("events loaded");
					cb(null);
					$("#home-events-tabs").removeClass("loading");
			});
	},
	load_templates: function(callback) {
		
		var maincb = callback;
		var template_list = [];
		if (typeof ofw_data.templates.event_item == "undefined") {
			template_list.push(function(cb){
				$.get("tpl/event_item.html", function(tpl) { ofw_data.templates.event_item = tpl });
				cb(null);
			})
			
		}

		if (typeof ofw_data.templates.event_view == "undefined") {
			template_list.push(function(cb){
				$.get("tpl/event_view.html", function(tpl) { ofw_data.templates.event_view = tpl });
				cb(null);
			})
		}
		

		async.parallel(template_list, function(callback){
			console.log("templates loaded");
			maincb();
		});
	},
	utils: {
		init_gmap : function(map_container, $map_options) {
			var option = $.extend({
	          mapTypeId: google.maps.MapTypeId.SATELLITE,
	          panControl: false,
	          rotateControl: false,
	          scrollwheel: false,
	          mapTypeControl: false,
	          disableDefaultUI: true
	        }, $map_options);
	        option = {};
	        return new google.maps.Map(document.getElementById(map_container), option);
		}
	}

}

var ready_event =  (window.cordova) ? "deviceready" : "ready";
$(document).on(ready_event, ofw.init);
