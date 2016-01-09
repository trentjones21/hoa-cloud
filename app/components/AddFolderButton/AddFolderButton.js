var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./AddFolderButton.css');
var Link = ReactRouter.Link;
var Navigation = require('../Navigation');
var UserButton = require('../UserButton');
var File = require('../File');
var API = require('../../services/api');

var AddFolderButton = React.createClass({
	getInitialState: function() {
		return {showPopover: false}
	},
	onDrop: function (files) {
      console.log('Received files: ', files);
    },
	hidePopover: function() {
		this.setState({showPopover: false});
	},
	showPopover: function() {
		this.setState({showPopover: true});
	},
	createFolder: function(e) {
		e.preventDefault();
		var self = this;
		this.setState({showPopover: false, creatingFolder: true});
		var pathString = '';
		for (var i in this.props.path) {
			pathString += this.props.path[i] + '/';
		}
		API.file.createFolder(pathString + this.refs.folderName.value + '/').then(function(data) {
			self.setState({creatingFolder: false});
			self.props.reloadFiles();
		});
	},
	render: function() {
    	return (
				<div className='AddFolderButton '>
					<button className='btn btn-hover' onClick={this.showPopover}>
						<i className='fa fa-folder'></i> Create Folder
					</button>
					<br/>
					{this.state.creatingFolder ? 
						<span><i className="fa fa-circle-o-notch fa-spin"></i> Creating Folder</span> 
					: '' }
					{this.state.showPopover ? ( 
						<div>
							<div className='screen' onClick={this.hidePopover}>
							</div>
							<div className='folder-popover'>
								<h1>New Folder</h1>
								<p>Type the name of the new folder you would like to create.</p>
								<form className='form-inline' onSubmit={this.createFolder}>
									<div className='input-group'>
										<input type='text' placeholder='Folder Name' ref='folderName' className='form-control'/>
										<span className='input-group-btn'>
											<button className='btn btn-default' type='button' onClick={this.createFolder}>Create</button>
										</span>
									</div>
								</form>
							</div>
						</div>
					) : '' }
				</div>
    	);
  	}
});

module.exports = AddFolderButton;
