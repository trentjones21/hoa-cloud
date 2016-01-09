var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;
var style = require('./Register.css');
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
		API.auth.register({
			firstName: firstname, 
			lastName: lastname, 
			email: email, 
			password: password, 
			hoaId: hoa.id
		}).then(function() {
			this.history.pushState(null, '/files');
			window.location.replace('/#/files');
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
				<div className="outer login">
					<div className="middle">
						<div className="inner login-box" >
							<h2>Register</h2>
							{this.state.selectedHoa ? 
								<h3>
									<small>Registering as memeber of</small><br/>
									{this.state.selectedHoa.name}
									<small className='change-button' onClick={this.changeSelectedHoa}> change</small>
								</h3>
								: 	(<div>
										<div className='instructions'>Start by typing the name of your HOA</div>
										<HOASearch onHoaSelect={this.onHoaSelect} />
									</div>)
							}
							{this.state.selectedHoa ? 
								<form className="form form-vertical" onSubmit={this.register}>
									<div className='form-group'>
										<label>First Name</label>
										<input className='form-control' type="text" placeholder="First Name" ref="firstname" autoFocus={true} />
									</div>
									<div className='form-group'>
										<label>Last Name</label>
										<input className='form-control' type="text" placeholder="Last Name" ref="lastname" autoFocus={true} />
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
							Already have an account? <Link to='/login'>Login here</Link>
						</div>
				  </div>
			  </div>
		  </div>
		);
	}
});
module.exports = Register;
