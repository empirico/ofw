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

		ofw.build_controls()
		ofw.events();
		
		

	},
	build_controls: function() {
		//bind homepage events
		$$("#create-event").on('click', function() {
					$.get("event.html", function(data){

						$html = '<div class="popup">' + data + "</div>";
						ofwF7App.popup($html);

					});
		});
	},
	events: function(){
		
		var template;
		var load_events = function($url, $target, acallback) {
			$.ajax({
				  dataType: "json",
				  url: $url,
				  success: function(data) {
							$(data).each(function(i, el) {
								$item = Mustache.render(template, el)
								$target.append($item);
							})
							acallback(null, "events-loaded");
						}
				});
		}
		$.get("tpl/event_item.mst", function(tpl) { 
			template = tpl;
			var parallel_tasks = [function(callback){
									load_events("json/events_nearby.json", $("#home-tab-nearby-ofws ul"), callback);

									},
									function(callback){
										load_events("json/events_friends.json", $("#home-tab-friends-ofws ul"), callback)
								}];
			async.parallel(parallel_tasks, function(){
					console.log("async finished");
					$("#home-events-tabs").removeClass("loading");
			});
			
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
