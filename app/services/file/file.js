var request = require('axios');

var file = {
	get: function() {
		return request.get('http://localhost:3009/api/g/files', {
			headers: {'x-access-token': localStorage.ghost}		
		});
	}
}


module.exports = file;
