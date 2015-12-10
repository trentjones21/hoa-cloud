var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./FilesPage.css');
var Link = ReactRouter.Link;
var Navigation = require('../Navigation');
var UserButton = require('../UserButton');
var File = require('../File');
var API = require('../../services/api');


var FilesPage = React.createClass({
	getInitialState: function() {
		return {
			path: ['Root']
		}
	},
	componentWillMount: function() {
		var self = this;
		this.setState({files: [], visibleFiles: []}); 
		API.file.get().then(function(data) {
			self.setState({files: data.data}, self.setVisibleFiles);
		}).catch(function(err) {
			console.log('err', err);
		});
	},
	fileClicked: function(file) {
		console.log('this', this);
		var newPath = file.name.split('/');
		if (newPath[newPath.length - 1] === '') newPath.pop();
		this.setState({path: newPath}, this.setVisibleFiles);
		this.props.setNavigation(newPath);
	},
	setVisibleFiles: function() {
		var path = this.state.path,
			allFiles = this.state.files,
			visibleFiles = [];	

		for (var i in allFiles) {
			var currentFile = allFiles[i];
			var parts = currentFile.name.split('/');
			if (parts[parts.length - 1] === '') parts.pop();

			if (parts.length === path.length + 1) {
				if(path.join(',') === parts.slice(0, parts.length - 1).join(',')){
					visibleFiles.push(currentFile);
				}
			}
		}

		this.setState({visibleFiles: visibleFiles});
	},
	render: function() {
		var self = this;
    	return (
			<div>
				<h1>Files</h1>
				{ this.state.visibleFiles.map(function(file) {
					return (
							<div key={file.name} className='col-md-3' onClick={self.fileClicked.bind(self, file)}>
								<File file={file} /> 
							</div>
					)
				})}
			</div>
    	);
  	}
});

module.exports = FilesPage;
