var map;
var ofw = {

	init: function(){

		map = ofw.utils.init_gmap("home-map-canvas", {});

		// Add view
		var mainView = ofwF7App.addView('.view-main', {
		    // Because we use fixed-through navbar we can enable dynamic navbar
		    dynamicNavbar: true
		});
		/*
			center: new google.maps.LatLng(45.4654219,9.1859243)
		})
      	*/

	},
	events: function(){

	},
	utils: {
		init_gmap : function(map_container, $map_options) {

			var map_canvas = document.getElementById(map_container);
			var option = $.extend({
	          mapTypeId: google.maps.MapTypeId.SATELLITE,
	          panControl: false,
	          rotateControl: false,
	          scrollwheel: false,
	          mapTypeControl: false,
	          disableDefaultUI: true
	        }, $map_options);
	        return new google.maps.Map(map_canvas, option);
		}
	}

}