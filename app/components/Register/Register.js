var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;
var style = require('./Register.css');
var auth = require("../auth.js");
var HOASearch = require('../HOASearch');
var Link = ReactRouter.Link;
var API = require('../../services/api');


var Register = React.createClass({
	mixins: [ History ],
	getInitialState: function() {
		return {
		  error: false
		};
	},
	register: function(event) {
		event.preventDefault();
		var name = this.refs.firstname.value + ' ' + this.refs.lastname.value;
		var firstname = this.refs.firstname.value;
		var lastname = this.refs.lastname.value;
		var email = this.refs.email.value;
		var password = this.refs.password.value;
   		var hoa = this.state.selectedHoa; 
		if (!name || !email || !password || !hoa) {
		  return;
		}
		auth.register(name, email, password, hoa.name,  function(loggedIn) {
			  if (!loggedIn)
			return this.setState({
			  error: true
			});
		  this.history.pushState(null, '/home');
		}.bind(this));
		API.auth.register({
			firstName: firstname, 
			lastName: lastname, 
			email: email, 
			password: password, 
			hoaId: hoa.id
		});
	},
	onHoaSelect: function(hoa) {
		this.setState({selectedHoa: hoa});
	},
	changeSelectedHoa: function() {
		this.setState({selectedHoa: undefined});
	},
	render: function() {
		return (
			<div className='Register'>
				<h2>Register <small>or <Link to='/login'>login</Link></small></h2>
				{this.state.selectedHoa ? 
					<h3>
						<small>Registering as memeber of</small><br/>
						{this.state.selectedHoa.name}
						<small className='change-button' onClick={this.changeSelectedHoa}> change</small>
					</h3>
					: 	(<div>
							Start by typing the name of your HOA
							<HOASearch onHoaSelect={this.onHoaSelect} />
						</div>)
				}
				{this.state.selectedHoa ? 
					<form className="form form-vertical" onSubmit={this.register}>
						<div className='form-group'>
							<label>First Name</label>
							<input className='form-control' type="text" placeholder="Name" ref="firstname" autoFocus={true} />
						</div>
						<div className='form-group'>
							<label>Last Name</label>
							<input className='form-control' type="text" placeholder="Name" ref="lastname" autoFocus={true} />
						</div>
						<div className='form-group'>
							<label>Email</label>
							<input className='form-control' type="text" placeholder="Email" ref="email"/>
						</div>
						<div className='form-group'>
							<label>Password</label>
							<input className='form-control' type="password" placeholder="Password" ref="password"/>
						</div>
						<div className='form-group'>
							<input className="btn btn-primary" type="submit" value="Register" />
						</div>
						{this.state.error ? (
							<div className="alert">Invalid email or password.</div>
						) : null }
					</form>
					: ''
				}
		  </div>
		);
	}
});

module.exports = Register;
