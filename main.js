$(document).ready(function() {
	/*
	 * What should this do?
	 * It's supposed to take an input (of the form {ask, askee, status}),
	 * append to a running array (... which should probably be passed in as an input...)
	 * and provide a method to write the array to localstorage.
	 * Also have a method to load the whole thing from localstorage.
	 */

	const writeEntry = ({ask, askee, status}, key = "rejectionList", entries = []) => {
		e = JSON.parse(localStorage.getItem(key));
		//console.log(e);
		//console.log(entries);
		if (entries.length === 0) {
			entries = e;
			if (entries === null) {
				entries = []; //Initialize array ifndef
			}
		} else {
			if (e !== null && e !== []) {
				e.push(entries); //Probably got this one wrong.
				entries = e;
			}
		}
		//console.log(entries);
		entries.push({ask, askee, status});
		//console.log(entries);
		localStorage.setItem(key, JSON.stringify(entries));

		return entries;
	};

	writeEntry.outputLog = (key = "rejectionList") => {
		const entries = JSON.parse(localStorage.getItem(key));
		let log = "";
		if (entries !== null) {
			entries.forEach(entry => {
				log += `${ entry.askee }: ${ entry.ask } - ${ entry.status } <br>`;
			});
		}
		return log;
	};

	writeEntry.getScore = (key = "rejectionList") => {
		const entries = JSON.parse(localStorage.getItem(key));
		let score = 0;
		if (entries !== null) {
			entries.forEach(entry => {
				if (entry.status === "Accepted") {
					score += 1;
				} else {
					score += 10;
				}
			});
		}
		return score;
	};
	const updateDisplay = () => {
		$('input[name=askee-input]').val('');
		$('input[name=ask-input]').val('');
		$('.score').text(writeEntry.getScore());
		$('.output-log').html(writeEntry.outputLog());
	}

	updateDisplay();
	console.log("redy");

	$('.button').click(function (e) { 
		e.preventDefault();
		if (($('input[name=askee-input]').val() === '') || ($('input[name=ask-input]').val() === '')) {
			console.log('Empty click');
			return;
		}
		
		const entryReport = writeEntry({
			ask: $('input[name=ask-input]').val(),
			askee: $('input[name=askee-input]').val(),
			status: $(this).hasClass('accept-btn') ? "Accepted" : "Rejected"
		});
		console.log(entryReport.entries);
		
		updateDisplay();
	});
	
});