beforeEach(function() {
	var modalHtml = [
		'<div id="test-modal">',
			'<p>This is the test modal</p>',
			'<button class="close">Close</button>',
		'</div>'
	].join('');

	$(modalHtml).appendTo('body');
});


afterEach(function() {
	$('#test-modal').remove();
	$('#modal-bg').remove();
});