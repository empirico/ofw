
var ofwConfig = {
	webservice : 'json',
	events : [],
	search_filter: {},
	load_templates: function(callback) {
		var template_list = [];
		if (typeof ofwConfig.templates.event_item == "undefined") {
			template_list.push(function(cb){
				$.get("tpl/event_item.html", function(tpl) { ofwConfig.templates.event_item = tpl;});
				cb(null);
			})
			
		}
		if (typeof ofwConfig.templates.event_view == "undefined") {
			template_list.push(function(cb){
				$.get("tpl/event_view.html", function(tpl) { ofwConfig.templates.event_view = tpl; });
				cb(null);
			})
		}

		if (typeof ofwConfig.templates.search_item == "undefined") {
			template_list.push(function(cb){
				$.get("tpl/search_item.html", function(tpl) { ofwConfig.templates.search_item = tpl; });
				cb(null);
			})
		}
		async.series(template_list, function(){
			callback();
		});
	},
	templates: {},

};
