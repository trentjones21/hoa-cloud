var React = require("react"),
	ReactRouter = require("react-router"),
	styles = require('./FilesPage.css'),
	Link = ReactRouter.Link,
	Navigation = require('../Navigation'),
	UserButton = require('../UserButton'),
	File = require('../File'),
	Folder = require('../Folder'),
	AddFileButton = require('../AddFileButton'),
	AddFolderButton = require('../AddFolderButton'),
	API = require('../../services/api'),
	_ = require('underscore'),
	jwt = require('../../services/jwt');
	History = ReactRouter.History;

var FilesPage = React.createClass({
	mixins: [ History ],
	getInitialState: function() {
		var roles = jwt.get('roles');
		var isHoaAdmin = _.contains(roles, 'HOAAdmin')
		return {
			path: ['All Files'],
			pathHistory: [],
			visibleFolders: [],
			visibleFiles: [],
			loading: false,
			error: false,
			isHoaAdmin: isHoaAdmin,
			draggingFolder: null,
			draggingFie: null
				// Right now I am pushing to pathHistory in order to keep track of browser history.
				// Should be able to update this to use the react-router history
		}
	},
	componentWillMount: function() {
		this.props.setNavigation(null, this.convertToNavPath(this.state.path));
		this.loadFiles();
		window.onpopstate = this.onBackButtonEvent
	},
	onBackButtonEvent: function (e) {
		e.preventDefault();
		var last = this.state.pathHistory.pop();
		if (!!last) {
			this.setState({path: last}, this.setVisibleFiles);
			this.props.setNavigation(null, this.convertToNavPath(last));
		}
	},
	loadFiles: function() {
		this.setState({loading: true});
		var self = this;
		API.file.get().then(function(data) {
			self.setState({files: data.data, loading: false}, self.setVisibleFiles);
		}).catch(function(err) {
			console.log('err', err);
			self.setState({error: true, loading: false});
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
	folderClicked: function(folder) {
		this.state.pathHistory.push(this.state.path);
		var newPath = folder.name.split('/');
		if (newPath[newPath.length - 1] === '') newPath.pop();

		this.setState({path: newPath}, this.setVisibleFiles);
		this.props.setNavigation(null, this.convertToNavPath(newPath));
		history.pushState(null, '');
	},
	folderDragStarted: function(folderName) {
		this.setState({draggingFolder: folderName});
	},
	folderDroppedOn: function(folderName) {
		if (this.state.draggingFolder) {
			this.state.draggingFolder.droppedOn(folderName);
		}
		if (this.state.draggingFile) {
			this.state.draggingFile.droppedOn(folderName);
		}
	},
	folderDragEnded: function() {
		this.setState({draggingFolder: null});
	},
	fileDragStarted: function(fileName) {
		this.setState({draggingFile: fileName});
	},
	fileDragEnded: function() {
		this.setState({draggingFile: null});
	},
	back: function() {
		var self = this;
		var path = this.state.path;
		path.pop();
		this.setState({path: path}, function() {
			self.setVisibleFiles();
			self.props.setNavigation(null, this.convertToNavPath(path));
		});
	},
	render: function() {
		var self = this;
    	return (
			<div className='FilesPage'>
				{ // Add File Button
					this.state.isHoaAdmin ?
						<AddFileButton path={this.state.path} reloadFiles={this.loadFiles}/>
					: ''
				}
				{ // Add Folder Button
					this.state.isHoaAdmin ?
						<AddFolderButton path={this.state.path} reloadFiles={this.loadFiles}/>
					: ''
				}
				<h1>
					{ // Back Button
						this.state.path.length > 1 ?
							<i className='fa fa-arrow-circle-o-left back-button' onClick={this.back} /> 
						: ''
					}
					{this.state.path[this.state.path.length - 1]}
					{  // Loading spinner
						this.state.loading ? 
							<i className="fa fa-circle-o-notch fa-spin"></i>
						: '' 
					}	
				</h1>
				{ // Error message
					this.state.error ? 
						<div className='message'>Uh oh, something went wrong.  Please try again later.</div>
					: '' 
				}	
				{ // Empty Folder Message
					this.state.visibleFiles.length + this.state.visibleFolders.length === 0 && !this.state.loading && !this.state.error ?
						<div className='message'>Nothing to see here.  This folder is empty.</div>
					: ''
				}
				{ // Folders
					this.state.visibleFolders.map(function(folder) {
						return (
							<div key={folder.name} className='row-element col-md-3 col-sm-4 col-xs-12' >
								<Folder folder={folder} 
									folderClicked={self.folderClicked} 
									reloadFiles={self.loadFiles}
									dragStarted={self.folderDragStarted}
									droppedOn={self.folderDroppedOn}
									dragEnded={self.folderDragEnded}
								/> 
							</div>
						)
					}) 
				}
				{ // Files
					this.state.visibleFiles ? this.state.visibleFiles.map(function(file) {
						return (
							<div key={file.name} className='row-element col-md-3 col-sm-4 col-xs-12' >
								<File file={file} 
									reloadFiles={self.loadFiles}
									dragStarted={self.fileDragStarted}
									dragEnded={self.fileDragEnded}
								/> 
							</div>
							)
					}): '' 
				}
			</div>
    	);
  	}
});

module.exports = FilesPage;
