var request = require('axios');

var auth = {
	login: function() {
		request.post('http://localhost:3009/api/auth/login', {
				email: 'trentjones21@gmail.com', 
				password: 'test'
		}).then(function(data) {
			console.log('data', data);
		}).catch(function(error) {
			console.log('error', error);	
		});
	},
	register: function(params) {
		request.post('http://localhost:3009/api/auth/register', params).then(function(data) {
			localStorage.ghost = data.data.token;
			console.log('data', data);
		}).catch(function(error) {
			console.log('error', error);	
		});
	}

}


module.exports = auth;
