// Client-side javascripts for Trackr App
// requires jquery

// listeners
$(document).ready(function() {
	init_get_url();

});

var init_get_url = function() {
	$('#get-url').submit(function(event) {
		event.preventDefault();
		
		var form_data = $(this).serialize();
		
		$.ajax({
			url: '/api',
			type: 'GET',
			data: form_data,
			dataType: 'json',
			success: function(data) {
				viz_new_data(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("error with ajax");
			}
		});
		
		
		//var input_text = $form.find('#tfrrs-url').val();
		// cut off a leading 
		//var input_text = (input_text.slice(0,1) == '/' ? input_text.slice(1) : input_text)
		
	
	});
};

var viz_new_data = function(data) {
	// controller for adding a new visualization
	
	// Athlete or org?
	
	// testing 
	$('#graphs').prepend("<article class='pane'></article>").text(data);

};