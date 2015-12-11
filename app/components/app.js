var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var auth = require("./auth.js");
var Header = require('./Header');
var Navigation = require('./Navigation');
var Sidebar = require('./Sidebar');

var App = React.createClass({
	mixins: [ History ],

	getInitialState: function() {
		return {
			loggedIn: auth.loggedIn(),
			menuVisible: false
		};
	},
	setStateOnAuth: function(loggedIn) {
		this.setState({loggedIn:loggedIn});
	},
	componentWillMount: function() {
		auth.onChange = this.setStateOnAuth;
	},
	logout: function(event) {
		auth.logout();
		this.history.pushState(null, '/');
	},
	toggleMenu: function() {
		this.setState({menuVisible: !this.state.menuVisible});
	},
	setNavigation: function(items, path) {
		if (items)
			this.setState({navigationItems: items});
		if (path)
			this.setState({navigationPath: path})
	},
	render: function() {
		var self = this;
		var childrenWithProps = React.Children.map(this.props.children, function(child) { // passing the setNavigation function to children
            var newChild = React.cloneElement(child, { setNavigation: self.setNavigation });
			return newChild;
        });
		return (
			<div>
				<Sidebar toggleMenu={this.toggleMenu} menuVisible={this.state.menuVisible}/>
				<Header />
				<Navigation toggleMenu={this.toggleMenu} items={this.state.navigationItems} path={this.state.navigationPath}/>
				<div className="container">
					{childrenWithProps}
				</div>
			</div>
		);
	}
});

module.exports = App;
