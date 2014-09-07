var ctrl_location = {

	init: function() {
		$.get("pages/event-location-search.html", function(location) {
			$html = '<div class="popup event-location">' + location + "</div>";
			ofwF7App.popup($html);
			$$(".event-location .close-self").on('click', function(){ ofwF7App.closeModal('.popup.event-location');})
			ctrl_location.bind_search();
		});
	},
	bind_search: function() {
		var hysteresis = null;
		//Bind search
		$("#event-location-search-input").keyup(function(){
			var $container = $("#event-location-items ul");
			$container.html("");
			var $this = $(this);
			console.log(hysteresis);
			if (hysteresis == null) {
				hysteresis = setTimeout(function() {
					if ($this.val().length > 3) {
						var ll = "51.507351,-0.127758";
						$("#event-location-create .preloader").removeClass("hide");
						ctrl_location.search(ll, $this.val(), function(data){
							if (data.meta.code == 200) {
								$(data.response.venues).each(function(i, el){
									item = Mustache.render(ofwConfig.templates.search_item, el)
									$item = $(item);
									$item.click(function(){})
									$container.append($item);
								})
								$("#event-location-create .preloader").addClass("hide");
								hysteresis = null;
								console.log(hysteresis);
							};
						});
					}
					hysteresis = null;
					console.log(hysteresis);
				}, 500);
			}
		})
	},
	search: function(ll, query, callback){
		$.get(ofwKeys.fs.url(ll, query),function(data) {
				console.log(data);
				if (typeof callback == "function") callback(data);
			}
		).fail(function(){
			console.log("failed_search");
		})
	}
}