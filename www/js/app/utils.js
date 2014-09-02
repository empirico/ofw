var ofwUtils = {
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