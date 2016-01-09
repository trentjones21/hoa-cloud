var GHOSTNAME = process.env.GHOSTNAME,
	Config = require('../../config/dev/trent');
if (GHOSTNAME) {
	var ghostString = GHOSTNAME.replace('.', '/');
	var Config = require('../../config/' + ghostString);
}

var config = {
	get: function(path) {
		var parts = path.split('.');
	
		var current = Config;	
		for (var i in parts) {
			current = current[parts[i]];
		}

		return current;
	}
};

module.exports = config;
