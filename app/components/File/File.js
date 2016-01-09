var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./File.css');
var Link = ReactRouter.Link;
var Navigation = require('../Navigation');
var UserButton = require('../UserButton');
var File = require('../File');
var API = require('../../services/api');
var jwt = require('../../services/jwt');
var _ = require('underscore');
var FileImage =require('./file.png');


var File = React.createClass({
	getInitialState: function() {
		var parts = this.props.file.name.split('/');
		if (parts[parts.length - 1] === '') parts.pop();

		var roles = jwt.get('roles');
		var isHoaAdmin = _.contains(roles, 'HOAAdmin')

		return {
			displayName: parts[parts.length - 1],
			isHoaAdmin: isHoaAdmin
		}
	},
	handleClick: function() {
		this.fileClicked(this.props.file);
	},
	fileClicked: function(file) {
		var self = this;
		this.setState({downloading: true});
		API.file.download(file.name).then(function(data) {
			console.log('returned');
			self.setState({downloading: false});
		});
	},
	deleteFile: function() {
		var self = this;
		this.setState({deleting: true});
		API.file.deleteFile(this.props.file.name).then(function(data) {
			self.props.reloadFiles();
		});
	},
	move: function(destinationPath) {
		var self = this;
		this.setState({moving: true});
		API.file.moveFile(this.props.file.name, destinationPath).then(function(data) {
			self.props.reloadFiles();
		});
	},
	dragStart: function(event) {
    	event.dataTransfer.setData("text", event.target.name);
		this.setState({dragging: true});
		var draggingFile = this;
		this.props.dragStarted(draggingFile);
	},
	dragEnd: function(event) {
		this.setState({dragging: false});
		this.props.dragEnded();
	},
	drop: function(event) {
		event.preventDefault();
	},
	droppedOn: function(path) {
		var pieces = this.props.file.name.split('/');
		var destinationPath = path + pieces[pieces.length - 1];
		this.move(destinationPath);
	},
	dragOver: function(event) {
		event.preventDefault();
	}, 
	render: function() {
    	return (
			<div className='File' >
				{
					this.state.isHoaAdmin ?
						<i className='fa fa-2x fa-times-circle close-button' onClick={this.deleteFile} ></i>
					: ''
				}
				<img src={FileImage}
						name={this.props.file.name}
						onClick={this.handleClick} 
						className={this.state.dragging ? 'file-image hidden-icon' : 'file-image'} 
						draggable="true" 
						onDragStart={this.dragStart} 
						onDragEnd={this.dragEnd}
						onDrop={this.drop}
						onDragOver={this.dragOver}
				/>	
				{
					this.state.downloading ? 
						<div className='action-wrapper'>
							<i className="fa fa-2x fa-circle-o-notch fa-spin"></i>
							<br/>
							Downloading...
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
				<div className='file-label'>
					{this.state.displayName}
				</div>
			</div>
    	);
  	}
});

module.exports = File;
