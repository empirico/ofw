var ofwEvent = {

	getAll: function(config){

		$.ajax({
			dataType: 'json',
			url: config.url,
			success: function(data) {
				$(data).each(function(i, el) {
					item = Mustache.render(config.template, el)
					$item = $(item);
					$item.click( function() {
						ofwEvent.view($(this).find(".event-item").data("eid"));
					});
					config.target.append($item);
					ofwConfig.events.push(el);
				})
				if (typeof config.callback == "function") config.callback();
			}
		})
	},
	get: function(id) {

	},
	save: function() {

	},
	edit: function() {

	},
	subscribe: function(id) {

	},
	unsubscribe: function(id) {

	},
	view: function(id) {

	}

}