var React = require("react"),
	ReactRouter = require("react-router"),
	History = ReactRouter.History,
	style = require('./Login.css'),
	HOASearch = require('../HOASearch'),
	Link = ReactRouter.Link,
	API = require('../../services/api');

var logo = require('./Logo.png');


var Login = React.createClass({
	mixins: [ History ],
	getInitialState: function() {
		return {
		  error: false
		};
	},
	login: function(event) {
		var self = this;
		event.preventDefault();

		var email = this.refs.email.value;
		var password = this.refs.password.value;
		if (!email || !password) {
			self.setState({error: true});
			return;
		}
		
		API.auth.login({
			email: email, 
			password: password 
		}).then(function(data) {
			if (data.token) {
				window.location.href = '/#/files';
				window.location.reload();
			} else {
				self.setState({error: true});
			}
		});
		return false;
	},
	render: function() {
		var query = this.props.location;
		var email = query && query.query ? query.query.email : '';
		console.log('email', email);		
		return (
			<div className='Login'>
				<div className="outer login">
					<div className="middle">
						<div className="inner login-box" >
							<img src={logo} className='logo'/>
							<br/>
							<br/>
							<form onSubmit={this.login}>
								<input className='form-control' type='email' placeholder="Email" ref='email' defaultValue={email}></input><br/>
								<input className='form-control' type='password' placeholder="Password" ref='password'></input><br/>
								<input type='submit' className='btn btn-primary form-control' onClick={this.login} /><br/><br/>
							</form>
							{
								this.state.error ? 
									<div className='error'>Incorrect email or password</div>
								: ''
							}
							<a href='#/register'>Need an account? Click here.</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Login;
