var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./File.css');
var Link = ReactRouter.Link;
var Navigation = require('../Navigation');
var UserButton = require('../UserButton');
var File = require('../File');
var API = require('../../services/api');

var FolderImage =require('./folder.png');
var FileImage =require('./file.png');


var File = React.createClass({
	getInitialState: function() {
		var parts = this.props.file.name.split('/');
		if (parts[parts.length - 1] === '') parts.pop();
		return {
			displayName: parts[parts.length - 1] 
		}
	},
	render: function() {
    	return (
			<div className='File'>
				<img src={this.props.type === 'file' ? FileImage : FolderImage} />	
				<br/>
				<div className='file-label'>
					{this.state.displayName}
				</div>
			</div>
    	);
  	}
});

module.exports = File;
