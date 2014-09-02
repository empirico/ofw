var ofwConfig = {
	webservice : 'json/',
	events : [],
	templates: [],
	search_filter: {},
	load_templates: function(maincb) {
		
		var template_list = [];
		if (typeof ofwConfig.templates.event_item == "undefined") {
			ofwConfig.templates.push(function(cb){
				$.get("tpl/event_item.html", function(tpl) { ofwConfig.templates = tpl });
				cb(null);
			})
			
		}

		if (typeof ofwConfig.templates.event_view == "undefined") {
			template_list.push(function(cb){
				$.get("tpl/event_view.html", function(tpl) { ofwConfig.templates.event_view = tpl });
				cb(null);
			})
		}
		

		async.parallel(template_list, function(callback){
			console.log("templates loaded");
			maincb();
		});
	}
}