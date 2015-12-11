var React = require("react");
	ReactRouter = require("react-router"),
	classNames = require('classnames'),
	styles = require('./FilesPage.css'),
	Link = ReactRouter.Link,
	Navigation = require('../Navigation'),
	UserButton = require('../UserButton'),
	File = require('../File'),
	API = require('../../services/api');
	History = ReactRouter.History;

var FilesPage = React.createClass({
	mixins: [ History ],
	getInitialState: function() {
		return {
			path: ['Root']
		}
	},
	componentWillMount: function() {
		var self = this;
		this.props.setNavigation(null, this.convertToNavPath(this.state.path));
		API.file.get().then(function(data) {
			self.setState({files: data.data}, self.setVisibleFiles);
		}).catch(function(err) {
			console.log('err', err);
		});
	},
	convertToNavPath: function(newPath) {
		var self = this;
		return newPath.map(function(current) {
			return {
				name: current,
				onClick: function() {
					self.popPathUntil(current);
				}
			}
		});	
	},
	folderClicked: function(folder) {
		var newPath = folder.name.split('/');
		if (newPath[newPath.length - 1] === '') newPath.pop();


		this.setState({path: newPath}, this.setVisibleFiles);
		this.props.setNavigation(null, this.convertToNavPath(newPath));
	},
	fileClicked: function(file) {
		API.file.download(file.name);
	},
	popPathUntil(filename) {
		var path = this.state.path;
		while(path[path.length - 1] !== filename && path.length) {
			path.pop();
		}
		this.setState({path: path}, this.setVisibleFiles);
		this.props.setNavigation(null, this.convertToNavPath(path));
	},
	setVisibleFiles: function() {
		var path = this.state.path,
			allFiles = this.state.files,
			visibleFolders = [],
			visibleFiles = [];	

		for (var i in allFiles) {
			var isFolder = false,
				currentFile = allFiles[i],
			 	parts = currentFile.name.split('/');

			if (parts[parts.length - 1] === '') {
			   	parts.pop();
				isFolder = true;
			}

			if (parts.length === path.length + 1) {
				if(path.join(',') === parts.slice(0, parts.length - 1).join(',')){
					if (isFolder) {
						visibleFolders.push(currentFile);
					} else {
						visibleFiles.push(currentFile);
					}
				}
			}
		}

		this.setState({visibleFolders: visibleFolders});
		this.setState({visibleFiles: visibleFiles});
	},
	render: function() {
		var self = this;
    	return (
			<div>
				<h1>Files</h1>
				{ this.state.visibleFolders ? this.state.visibleFolders.map(function(folder) {
					return (
						<div key={folder.name} className='col-md-3 col-sm-4 col-xs-12' onClick={self.folderClicked.bind(self, folder)}>
							<File file={folder} type='folder' /> 
						</div>
					)
				}): <i className="fa fa-5x fa-circle-o-notch fa-spin"></i> }
				{ this.state.visibleFiles ? this.state.visibleFiles.map(function(file) {
					return (
						<div key={file.name} className='col-md-3 col-sm-4 col-xs-12' onClick={self.fileClicked.bind(self, file)}>
							<File file={file} type='file' /> 
						</div>
					)
				}): '' }
			</div>
    	);
  	}
});

module.exports = FilesPage;
