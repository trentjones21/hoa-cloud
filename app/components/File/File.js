var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./File.css');
var Link = ReactRouter.Link;
var Navigation = require('../Navigation');
var UserButton = require('../UserButton');
var File = require('../File');
var API = require('../../services/api');

var r =require('./file.png');


var File = React.createClass({
	render: function() {
    	return (
			<div className='File'>
				<img className='file-image' src={r} />
				<br/>
				<div className='file-label'>
					{this.props.file.name}
				</div>
			</div>
    	);
  	}
});

module.exports = File;
