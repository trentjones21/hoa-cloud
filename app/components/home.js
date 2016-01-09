var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// Home page, which shows Login and Register buttons
var Home = React.createClass({
  render: function() {
    return (
			<div>
				<h1>Welcome to HOA Cloud</h1>
				<h3>
					Our cloud-based HOA software introduces transparency to communities by providing 24/7 access to bill pay, announcements, voting, a member directory, and all community documents.
				</h3>
				<br/>
				<br/>
				<p>
					<Link className="btn btn-default" to="login">Login</Link> or <Link className="btn btn-primary" to="register">Register</Link>
				</p>
			</div>
    );
  }
});

module.exports = Home;
