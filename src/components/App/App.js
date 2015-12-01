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
		this.state = {menuVisible: false};
		this.toggleMenu = this.toggleMenu.bind(this);
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

	render() {
		return this.renderPage(this.state.menuVisible);
	}
}

export default App;
