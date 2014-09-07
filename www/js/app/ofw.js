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
			ctrl_home.init	
		]);
	}
}

var ready_event =  (window.cordova) ? "deviceready" : "ready";
$(document).on(ready_event, ofw.init);
