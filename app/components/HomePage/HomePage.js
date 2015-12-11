var React = require('react');
var ReactRouter = require('react-router');
var styles = require('./HomePage.css');
var api = require('../api');

var HomePage = React.createClass({
	getInitialState: function() {
		return {
			hoaName: '',
			message: '',
			announcements: []
		}
	},
	componentWillMount: function() {
		var self = this;
		console.log('commponentWillMount');
		api.getHoa(function(success, hoas) {
			var hoa = hoas.hoa[hoas.hoa.length - 1];
			console.log('hoooa', hoa);
			self.setState({
				hoaName: hoa.name,
				message: hoa.message,
				announcements: hoa.announcements
			});
		});
	},
	render: function() {
		return (
			<div className='Home'>
				<h1 className='hoa-name'>{this.state.hoaName}</h1>
				<p className='message'>{this.state.message}</p>
				<div className='well announcements'>
					<h1>Announcements</h1>
					{ this.state.announcements.map(function(announcement) {
						return (<div key={announcement.title} className='announcement'>
							<h2>{announcement.title}</h2>
							<p>{announcement.description}</p>
						</div>)
					})}
				</div>
			</div>
		)
	}
});

module.exports = HomePage;
