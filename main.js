$(document).ready(function() {
	console.log("redy");

	$('.button').click(function (e) { 
		e.preventDefault();
		if (($('input[name=askee-input]').val() === '') || ($('input[name=ask-input]').val() === '')) {
			console.log('Empty click');
			return;
		}
		//For now: Write to the log span
		const logEntry = `${ $('input[name=askee-input]').val() } ${ $('input[name=ask-input]').val() }` +
			($(this).hasClass('accept-btn') ? " Accepted" : " Rejected") +
			"<br>";
		//console.log(logEntry);
		$('input[name=askee-input]').val('');
		$('input[name=ask-input]').val('');
		$('.output-log').append(logEntry);
	});

});