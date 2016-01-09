var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./ContextMenu.css');

var ContextMenu = React.createClass({
	getInitialState: function() {
		return {display: false}
	},
	onContextMenu: function(e) {
		e.preventDefault();
		this.setState({x: e.clientX, y: e.clientY},this.showMenu);
	},
	showMenu: function() {
		this.setState({display: true});
	},
	hideMenu: function() {
		this.setState({display: false});
	},
	itemClick: function(cb) {
		this.setState({display: false});
		if (cb) cb();
	},
	render: function() {
		var self = this;
    	return (
			<div className='ContextMenu' onContextMenu={this.onContextMenu}>
				{this.props.children}
				{
					this.state.display ?
						<div>
							<div className='screen' onClick={this.hideMenu} ></div>
							<div className='menu' style={{left: this.state.x + 1, top: this.state.y + 1}}>
								{
									this.props.title ?
										<div className='title'>{this.props.title}</div>
									: ''
								}
								{
									this.props.items.map(function(item) {
										return (
											<div key={item.text} className='item' onClick={self.itemClick.bind(self, item.callback)}>
												{item.text}
											</div>
										)
									})
								}
							</div>
						</div>
					: ''
				}
			</div>
    	);
  	}
});

module.exports = ContextMenu;
