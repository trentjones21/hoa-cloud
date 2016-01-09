var request = require('axios'),
	fileSaver = require('../file-saver'),
	q = require('q'),
	config = require('../config'),
	api = config.get('api');



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
		return request.get(api + '/g/files', {
			headers: {'x-access-token': localStorage.ghost}		
		});
	},
	download: function(filename) {
		var deferred = q.defer();
		request.get(api + '/g/files/' + encodeURIComponent(filename), {
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
	},
	upload: function(file, path) {
		var options = {
			headers: {
				'Content-Type': file.type,
				'x-access-token': localStorage.ghost,
				'g-file-name': file.name,
				'g-path': path 
			}
		};
		return request.post(api + '/g/files', file, options);
	},
	createFolder: function(folderPath) {
		return request.post(api + '/g/folders', {
			folderPath: folderPath
		},{
			headers: {'x-access-token': localStorage.ghost}	
		});
	},
	deleteFile:function(filePath) {
		return request.delete(api + '/g/files/' + encodeURIComponent(filePath), {
			headers: {'x-access-token': localStorage.ghost}
		});
	},
	moveFile:function(filePath, destinationFolder) {
		return request.post(api + '/g/files/move', {
			filePath: filePath,
			newPath: destinationFolder	
		}, {
			headers: {'x-access-token': localStorage.ghost}
		});
	},
	renameFile: function(oldPath, newPath) {
		return request.put(api + '/g/files/', {
			oldPath: oldPath,
			newPath: newPath	
		},{
			headers: {'x-access-token': localStorage.ghost}
		});
	}
	
}


module.exports = file;
