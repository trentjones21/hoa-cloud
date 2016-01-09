var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./AddFileButton.css');
var Link = ReactRouter.Link;
var Navigation = require('../Navigation');
var UserButton = require('../UserButton');
var File = require('../File');
var API = require('../../services/api');
var Dropzone = require('react-dropzone');

var filePreview = require('./file-preview.png');

var AddFileButton = React.createClass({
	getInitialState: function() {
		return {showPopover: false, files: []}
	},
	onDrop: function (files) {
		this.setState({showPopover: false});
		var self = this;
		this.setState({files: files, completed: 0});
		var pathString = '';
		for (var i in this.props.path) {
			pathString += this.props.path[i] + '/';
		}
		for (var j in files) {
			API.file.upload(files[j], pathString).then(function() {
				self.setState({completed: self.state.completed+1});		
				if (self.state.completed === self.state.files.length) {
					self.setState({files: []});
				}
				self.props.reloadFiles();
			});
		}
    },
	hidePopover: function() {
		this.setState({showPopover: false});
	},
	showPopover: function() {
		this.setState({showPopover: true});
	},
	render: function() {
    	return (
				<div className='AddFileButton '>
					<button className='btn btn-hover upload-btn' onClick={this.showPopover}>
						<i className='fa fa-file'></i> Upload Files
					</button>
					<br/>
					{this.state.files.length > 0 ? 
						<span><i className="fa fa-circle-o-notch fa-spin"></i> uploading: {this.state.completed + 1} of {this.state.files.length}</span> 
					: '' }
					{this.state.showPopover ? ( 
						<div>
							<div className='screen' onClick={this.hidePopover}>
							</div>
							<div className='folder-popover'>
								<h1>File Upload</h1>
								<Dropzone onDrop={this.onDrop} className='dropzone' activeClassName='dropzone-active'>
									<div>
										<b>Drag & Drop</b> some files here, or <b>click</b> to select files to upload.
										<br/>
										<br/>
										 <i className="fa fa-5x fa-cloud-upload"></i>
									</div>
								</Dropzone>
							</div>
						</div>
					) : '' }
				</div>
    	);
  	}
});

module.exports = AddFileButton;
