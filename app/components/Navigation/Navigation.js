/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./Navigation.css');
var Link = ReactRouter.Link;




var Navigation = React.createClass({
	render: function() {
		return (
			<div className={classNames(this.props.className, 'Navigation')} role="navigation">
				<i className='fa fa-bars menu-button' onClick={this.props.toggleMenu}></i>
				{ this.props.items ? this.props.items.map(function(item) {
						return (<div className='item' >{item}</div>);
				}) : '' }
			</div>
    	);
  	}
});

module.exports = Navigation;
