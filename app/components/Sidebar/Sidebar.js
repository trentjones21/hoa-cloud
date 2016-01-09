var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./Sidebar.css');
var Link = ReactRouter.Link;

var Sidebar = React.createClass( {
	handleClick: function(click) {
		Link.handleClick(click);
		this.props.toggleMenu();
	},

	render: function() {
		return (
			<div className={classNames(this.props.className, 'Sidebar')}>

				<div className={this.props.menuVisible ? 'Sidebar-menu Sidebar-menu-visible' : 'Sidebar-menu Sidebar-menu-hidden'} 
					onClick={this.props.toggleMenu}
				>
					<h1>Menu {this.props.menuVisible}</h1>
						<div className='menu-item'>
							<i className='fa fa-home'></i>
							Home <small className='coming-soon'>coming soon!</small>
						</div>
					<a href='#files'>
						<div className='menu-item'>
							<i className='fa fa-folder'></i>
							Files
						</div>
					</a>
						<div className='menu-item'>
							<i className='fa fa-credit-card-alt'></i>
							Bill pay <small className='coming-soon'>coming soon!</small>
						</div>
				</div>
				<div className={this.props.menuVisible ? 'Sidebar-screen Sidebar-screen-visible' : 'Sidebar-screen Sidebar-screen-hidden'} 
					onClick={this.props.toggleMenu}
				>

				</div>
			</div>
    	);
  	}
});

module.exports = Sidebar;
