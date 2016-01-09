var React = require("react"),
	ReactRouter = require("react-router"),
	classNames = require('classnames'),
	styles = require('./Folder.css'),
	Link = ReactRouter.Link,
	Navigation = require('../Navigation'),
	UserButton = require('../UserButton'),
	Modal = require('../Modal'),
	ContextMenu = require('../ContextMenu'),
	Folder = require('../Folder'),
	jwt = require('../../services/jwt'),
	_ = require('underscore'),
	API = require('../../services/api');

var FolderImage =require('./folder.png');
var FolderOpenImage =require('./folder-open.png');


var Folder = React.createClass({
	getInitialState: function() {
		var self = this;
		var parts = this.props.folder.name.split('/');
		if (parts[parts.length - 1] === '') parts.pop();

		var roles = jwt.get('roles');
		var isHoaAdmin = _.contains(roles, 'HOAAdmin');
		
		var contextMenuItems = [
			{
				text: 'Rename',
				callback: function() {
					self.toggleRenameModal();
				}

			},
			{
				text: 'Delete',
				callback: function() {
					self.deleteFolder();
				}

			}
		]
		return {
			displayName: parts[parts.length - 1],
			isHoaAdmin: isHoaAdmin,
			contextMenuItems: contextMenuItems
		}
	},
	handleClick: function() {
		this.folderClicked(this.props.folder);
	},
	folderClicked: function(folder) {
		this.props.folderClicked(folder);
	},
	renameFolder: function() {
		var self = this;
		this.setState({renaming: true});
/*
		API.file.renameFile(this.props.folder.name).then(function(data) {
			self.setState({renaming; false});
			self.props.reloadFiles();
		});
		*/
	},
	deleteFolder: function() {
		var self = this;
		this.setState({deleting: true});
		API.file.deleteFile(this.props.folder.name).then(function(data) {
			self.props.reloadFiles();
		});
	},
	move: function(destinationPath) {
		var self = this;
		this.setState({moving: true});
		API.file.moveFile(this.props.folder.name, destinationPath).then(function(data) {
			self.props.reloadFiles();
		});
	},
	toggleRenameModal: function() {
		this.setState({displayRenameModal: !this.state.displayRenameModal});
	},
	dragStart: function(event) {
    	event.dataTransfer.setData("text", event.target.name);
		this.setState({dragging: true});
		var draggingFolder = this;
		this.props.dragStarted(draggingFolder);
	},
	dragEnd: function(event) {
		this.setState({dragging: false});
		this.props.dragEnded();
	},
	dragEnter: function(event) {
		this.setState({useOpenImage: true});
	},
	dragExit: function(event) {
		this.setState({useOpenImage: false});
	},
	drop: function(event) {
		event.preventDefault();
		this.setState({useOpenImage: false});
		var droppedOnFolder = event.target.name;
		this.props.droppedOn(droppedOnFolder);
	},
	droppedOn: function(path) {
		if (this.props.folder.name !== path) {
			var pieces = this.props.folder.name.split('/');
			if (pieces[pieces.length - 1] === '') {
				pieces.pop();	
			}
			var destinationPath = path + pieces[pieces.length - 1] + '/';

			this.move(destinationPath);
		}
	},
	dragOver: function(event) {
		event.preventDefault();
	}, 
	render: function() {
    	return (
			<div className='Folder' >
				{
					this.state.isHoaAdmin && !this.state.dragging ?
						<i className='fa fa-2x fa-times-circle close-button' onClick={this.deleteFolder}></i>
					: ''
				}
				<ContextMenu items={this.state.contextMenuItems} >
					<img src={this.state.useOpenImage ? FolderOpenImage : FolderImage} 
						name={this.props.folder.name}
						onClick={this.handleClick} 
						className={this.state.dragging ? 'folder-image hidden-icon' : 'folder-image'} 
						draggable="true" 
						onDragStart={this.dragStart} 
						onDragEnd={this.dragEnd}
						onDragEnter={this.dragEnter}
						onDragExit={this.dragExit}
						onDragLeave={this.dragExit}
						onDrop={this.drop}
						onDragOver={this.dragOver}
					/>	
				</ContextMenu>
				{
					this.state.renaming ? 
						<div className='action-wrapper'>
							<i className="fa fa-2x fa-circle-o-notch fa-spin"></i>
							<br/>
							Renaming...
						</div>
					: 	''
				}
				{
					this.state.deleting ? 
						<div className='action-wrapper'>
							<i className="fa fa-2x fa-circle-o-notch fa-spin"></i>
							<br/>
							Deleting...
						</div>
					: 	''
				}
				{
					this.state.moving ? 
						<div className='action-wrapper'>
							<i className="fa fa-2x fa-circle-o-notch fa-spin"></i>
							<br/>
							Moving...
						</div>
					: 	''
				}
				<br/>
				<div className='folder-label'>
					{this.state.displayName}
				</div>

				<Modal toggle={this.toggleRenameModal} display={this.state.displayRenameModal}>
					<h1>Rename Folder</h1>
					<p>Type the new name of the folder.</p>
					<form className='form-inline' onSubmit={this.createFolder}>
						<div className='input-group'>
							<input type='text' placeholder='Folder Name' ref='folderName' className='form-control'/>
							<span className='input-group-btn'>
								<button className='btn btn-default' type='button' onClick={this.renameFolder}>Rename</button>
							</span>
						</div>
					</form>
				</Modal>
			</div>
    	);
  	}
});

module.exports = Folder;
