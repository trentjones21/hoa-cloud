var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;
var classNames = require('classnames');
var styles = require('./UserButton.css');
var Link = ReactRouter.Link;
var SelectMenu = require('../SelectMenu');
var API = require('../../services/api');

var UserButton = React.createClass({
  	mixins: [ History ],
	getInitialState: function() {
		return {menuItems: [{
			text: 'Logout',
			icon: 'fa-sign-out',
			callback: function() {
				API.auth.logout(function() {
					window.location.replace('/');
				});
			}
		}]};
	},	
	render: function() {
		return (
			<SelectMenu className={classNames(this.props.className, 'UserButton')} items={this.state.menuItems}>
				<div>
					<span className="fa-stack">
  						<i className="fa fa-square-o fa-stack-2x"></i>
  						<i className="fa fa-user fa-stack-1x"></i>
					</span>
				</div>
			</SelectMenu>
   		);
  	}
});

module.exports = UserButton;
