var request = require('axios');
var config = require('../config');
var api = config.get('api');
var q = require('q');

var auth = {
	login: function(params) {
		return request.post(api + '/auth/login', params).then(function(data) {
			localStorage.ghost = data.data.token;
			return data.data;
		}).catch(function(error) {
			console.log('error', error);	
		});
	},
	register: function(params) {
		return request.post(api + '/auth/register', params).then(function(data) {
			localStorage.ghost = data.data.token;
		}).catch(function(error) {
			console.log('error', error);	
		});
	},
	logout: function(cb) {
		delete localStorage.ghost;
		if (!!cb) cb();
	},
	loginGuest: function(params) {
		return request.post(api + '/auth/login-guest', params).then(function(data) {
			localStorage.ghost = data.data.token;
			return data.data;
		}).catch(function(error) {
			console.log('error', error);	
		});
	}
}


module.exports = auth;
