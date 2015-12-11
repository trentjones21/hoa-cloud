var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./SelectMenu.css');
var Link = ReactRouter.Link;


var SelectMenu = React.createClass({
	getInitialState: function() {
		return {showMenu: false};
	},	
	toggleMenu: function() {
		this.setState({showMenu: !this.state.showMenu});
	},
	render: function()  {
		var dropdown;
		var screen;
		if (this.state.showMenu) {
			var href;
			if (this.props.items[0].url) {
				href = 
					<Link to={this.props.items[0].url}>
						<div className='dropdown-item'>
							{this.props.items[0].text}
						</div>
					</Link>
			} else {
				href = 
					<div className='dropdown-item' onClick={this.props.items[0].callback}>
						{this.props.items[0].text}
					</div>
			}

			dropdown = (
				<div className='dropdown'>
					{href}
				</div>
			);
			screen = ( 
				<div className='screen' onClick={this.toggleMenu}>
				</div>
			)
		}
		return (
			<div className={classNames(this.props.className, 'SelectMenu')}>
				<div className='button' onClick={this.toggleMenu}>	
					{this.props.children}
				</div>
				{dropdown}
				{screen}
			</div>
    	);
  	}
});

module.exports = SelectMenu;
