var request = require('request');

var statuses = {
	unknown: 0,
	loggedIn: 1,
	notLoggedIn: 2
}
var loggedInStatus = statuses.unknown;
var requestPending = false;
var post = function(url, body, callback) {
	// Set the headers
	var headers = {
		'Content-Type':     'application/json'
	}
	 
	// Configure the request
	var options = {
		url: url,
		method: 'POST',
		headers: headers,
		body: body,
		json: true
	}
	 
	// Start the request
	request(options, callback)
}

var exports = {
	test: function() {
		console.log('it is working now');
	},
	isLoggedIn: function() {
		if (!requestPending) {
			requestPending = true;
			post('http://localhost:3009/api/auth/login', {
					email: 'trentjones21@gmail.com',
					password: 'test'
				}, function(error, response, body) {
					setTimeout(function() {
						requestPending = false;
						if (body.token) {
							loggedInStatus = statuses.loggedIn;
						} else {
							loggedInStatus = statuses.notLoggedIn;
						}
						console.log('body', body);
					}, 5000);
			});
		} 
		 
		return loggedInStatus;
	}
}

module.exports = exports;
