var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./Header.css');
var Link = ReactRouter.Link;
var Navigation = require('../Navigation');
var UserButton = require('../UserButton');

var Header = React.createClass({
	getInitialState: function() {
		var hoaName = localStorage.hoaName;
		return {
			hoaName: hoaName || 'HOA Cloud'
		}
	},
	render: function() {
    	return (
      		<div className="Header">
          		<h1>{this.state.hoaName}</h1>
          		<UserButton className='Header-user-button'></UserButton>
      		</div>
    	);
  	}
});

module.exports = Header;
