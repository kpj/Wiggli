function play(data) {
	$('#info_text').text('Loading track');
	$('#info').show();

	MIDI.Player.stop();
	MIDI.Player.loadFile(
		data, 
		function() {
			$('#info').hide();
			console.log('Song loaded');

			MIDI.Player.start();
		}
	);
}

window.onload = function() {
	/*
	 * Other stuff
	 */
	$('#file_upload').attr('disabled', true);
	$('#info').show();

	$('#info_text').text('Initializing WebGL');
	initWebGL();
	// webgl stuff
	render();
	for(var i = 0 ; i < 5 ; i++)
		createCube(-10 + i*4);

	$('#info_text').text('Loading MIDI-Plugin');
	MIDI.loadPlugin({
		soundfontUrl: "./libs/midi/soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			console.log('MIDI-Plugin loaded');
			initListener();

			$('#info').hide();
			$('#file_upload').attr('disabled', false);
		}
	});

	/* 
	 * Initialize file upload
	 */
	$('#file_upload').on('change', function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				 play(e.target.result);
			};

			reader.readAsDataURL(this.files[0]);
		}
	});
}