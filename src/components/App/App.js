import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Header from '../Header';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import Feedback from '../Feedback';
import Footer from '../Footer';
import Auth from '../../utils/Auth';
import AuthorizingPage from '../AuthorizingPage'
import MainApp from '../MainApp'

@withViewport
@withContext
@withStyles(styles)
class App extends Component {
	constructor() {
		super()
		this.state = {menuVisible: false, loggedInStatus: 0};
		this.toggleMenu = this.toggleMenu.bind(this);
		
		var self = this;
		var authenticationLoop = setInterval(function() {
			console.log('loop');
			var loggedInStatus = Auth.isLoggedIn();
			if (loggedInStatus !== self.state.loggedInStatus) {	
				self.setState({loggedInStatus: Auth.isLoggedIn()});
			};
			if (self.state.loggedInStatus > 0) {
				clearInterval(authenticationLoop);
			};
		}.bind(self), 1000);

	}

	static propTypes = {
		children: PropTypes.element.isRequired,
		error: PropTypes.object
	};
	
	toggleMenu() {
		this.setState({menuVisible: !this.state.menuVisible});
	};

	renderPage(menuVisible) {
		return !this.props.error ? (
			<div className='App'>
				<Sidebar toggleMenu={this.toggleMenu} menuVisible={menuVisible}></Sidebar>
				<div className='App-app'>
					<Header />
					<Navigation toggleMenu={this.toggleMenu} />
					<div className='App-content'>
						{this.props.children}
					</div>
					<Feedback />
					<Footer />
				</div>
			</div>
		) : this.props.children;
	};
	
	renderNotAuthorized() {
			return (
				<div className='not-authorized'>
					<h1>Sorry, you are not authorized to view this page</h1>
					<p>if you think this is a mistake, please contact your HOA</p>
				</div>
			)
	};

	
	render() {
		console.log('rendering ', this.state.loggedInStatus);
		var component;
		if (this.state.loggedInStatus === 1) {
			//var component = this.renderPage(this.state.menuVisible);
			var component  = <AuthorizingPage />;
		} else {
			var component = <MainApp />;
		}

		return (
				<div>
					{this.state.loggedInStatus === 1 ? <AuthorizingPage /> : <MainApp />}
				</div>
		);
	}
}

export default App;
