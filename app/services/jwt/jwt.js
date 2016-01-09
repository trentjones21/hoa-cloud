var jwtDecode = require('jwt-decode');

var jwt = {
	get: function(optionalKey) {
		if (localStorage.ghost) {
			var token = jwtDecode(localStorage.ghost);
			if (!optionalKey) {
				return token;
			} else {
				return token[optionalKey];
			}
		} else {
			return null;
		}
	},
	hasValidToken: function() {
		if (localStorage.ghost) {
			var token = jwtDecode(localStorage.ghost);
		}
		return !!localStorage.ghost;
	}

};


module.exports = jwt;
