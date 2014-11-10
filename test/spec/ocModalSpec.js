describe('ocModal', function() {
	it('creates #modal-bg element when first initialized', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement);

		expect($('#modal-bg').length).to.be(1);
	});

	it('does not create additional #modal-bg elements when initialized again', function() {
		var secondModalElement = $('#test-modal').clone().attr('id', 'test-modal-2').appendTo('body')

		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement);
		new window.oc.Modal(secondModalElement);


		expect($('#modal-bg').length).to.be(1);

		$('#test-modal-2').remove();
	});

	it('adds .modal.hidden classes to the modal element', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement);

		expect(modalElement.is('.modal.hidden')).to.be(true);
	});

	it('opens the modal when the `open` event is triggered on the modal element', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement);

		modalElement.trigger('open');

		expect(modalElement.hasClass('hidden')).to.be(false);
	});

	it('closes the modal when the `close` event is triggered on the modal element', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement);

		modalElement.trigger('open');
		modalElement.trigger('close');

		expect(modalElement.hasClass('hidden')).to.be(true);
	});

	it('closes the modal when #modal-bg is clicked', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement);

		modalElement.trigger('open');

		$('#modal-bg').trigger('click');

		expect(modalElement.hasClass('hidden')).to.be(true);
	});

	it('does not close `reallyModal` modals when #modal-bg is clicked', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement, true);

		modalElement.trigger('open');

		$('#modal-bg').trigger('click');

		expect(modalElement.hasClass('hidden')).to.be(false);
	});

	it('runs a passed `onOpen` callback function when opened', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement, false, function() {
			$('body').append('<div id="open-callback-test"></div>');
		});

		expect($('#open-callback-test').length).to.be(0);

		modalElement.trigger('open');

		expect($('#open-callback-test').length).to.be(1);

		$('#open-callback-test').remove();
	});

	it('runs a passed `onClose` callback function when closed', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement, false, null, function() {
			$('body').append('<div id="close-callback-test"></div>');
		});

		expect($('#close-callback-test').length).to.be(0);

		modalElement.trigger('close');

		expect($('#close-callback-test').length).to.be(1);

		$('#close-callback-test').remove();
	});

	it('closes the modal when a `.close` element inside of it is clicked', function() {
		var modalElement = $('#test-modal');
		new window.oc.Modal(modalElement);

		modalElement.trigger('open');

		modalElement.find('.close').trigger('click');

		expect(modalElement.hasClass('hidden')).to.be(true);
	});
});