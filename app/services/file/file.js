var request = require('axios');
var fileSaver = require('../file-saver');
var q = require('q');



var getContentType = function (extension) {
	var map = {
		txt: 'text/plain',
		pdf: 'application/pdf',
		jpg: 'image/jpeg'
	};
	return map[extension];
};


var file = {
	get: function() {
		return request.get('http://localhost:3009/api/g/files', {
			headers: {'x-access-token': localStorage.ghost}		
		});
	},
	download: function(filename) {
		var deferred = q.defer();
		request.get('http://localhost:3009/api/g/files/' + encodeURIComponent(filename), {
			headers: {'x-access-token': localStorage.ghost}
		}).then(function(data) {
			var buf = new Buffer(data.data, 'base64'),
				extension = filename.split('.').pop(),
				file = new Blob([buf], {
					type: getContentType(extension)
				});

			fileSaver.saveAs(file, filename.split('/').pop(), true);

			deferred.resolve(data);
		}).catch(function(err) {
			console.log('err', err);
		});	

		return deferred.promise;
	}
}


module.exports = file;
