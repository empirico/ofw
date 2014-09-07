var ctrl_event = {
	init: function() {
		$.get("pages/event-create.html", function(create) {
			$html = '<div class="popup event-create">' + create + "</div>";
			ofwF7App.popup($html);
			$$(".event-create .close-self").on('click', function(){ ofwF7App.closeModal('.popup.event-create');})
			$$("#event-location").on('click', ctrl_location.init);
		})
	}
};