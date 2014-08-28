var map;
var ofw = {

	init: function(){
		
		$(window).load(function() {
			var  center_start = new google.maps.LatLng(45.4654219,9.1859243);
			
			/*
				map = ofw.utils.init_gmap("home_map", {
					center: center_start
				});	
			*/
		});
		
		$$("#create-event").on('click', function() {

			$.get("event.html", function(data){

				$html = '<div class="popup">' + data + "</div>";
				ofwF7App.popup($html);

			});
		});

	},
	events: function(){

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


ofw.init();