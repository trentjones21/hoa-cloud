var request = require('axios');
var config = require('../config');
var api = config.get('api');
var hoa = {
	getAll: function() {
		return request.get(api + '/auth/register/hoas');
	}	
}


module.exports = hoa;
