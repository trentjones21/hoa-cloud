var request = require('axios');

var hoa = {
	getAll: function() {
		return request.get('http://localhost:3009/api/auth/register/hoas');
	}	
}


module.exports = hoa;
