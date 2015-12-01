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

@withViewport
@withContext
@withStyles(styles)
class App extends Component {
	constructor() {
		super()
		this.state = {left: 0};
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	static propTypes = {
		children: PropTypes.element.isRequired,
		error: PropTypes.object
	};

	toggleMenu() {
		var self = this;
		var width = 200;

		if (this.state.left < width/2) {
			self.setState({left: width});
		} else {
			self.setState({left: 0});
		}
	};

	renderPage(left) {
		return !this.props.error ? (
			<div className='App'>
				<div className='App-sidebar'>
					<Sidebar toggleMenu={this.toggleMenu}></Sidebar>
				</div>
				<div className='App-app' style={{left: left}}>
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

	render() {
		return this.renderPage(this.state.left);
	}
}

export default App;
