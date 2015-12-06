/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Menu.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Menu extends Component {
	constructor() {
		super();
		this.toggleMenu = this.toggleMenu.bind(this);
		this.state = {showMenu: false}
	}	
	
	static propTypes = {
		className: PropTypes.string,
	};
	
	toggleMenu() {
		this.setState({showMenu: !this.state.showMenu});
	}

	render() {
		var dropdown;
		var screen;
		if (this.state.showMenu) {
			dropdown = (
				<div className='dropdown'>
					<a href={this.props.items[0].url}>
						<div className='dropdown-item'>
							{this.props.items[0].text}
						</div>
					</a>
					<div className='dropdown-item'>
						Item 2
					</div>
				</div>
			);
			screen = ( 
				<div className='screen' onClick={this.toggleMenu}>
				</div>
			)
		}
		return (
			<div className={classNames(this.props.className, 'Menu')}>
				<div className='button' onClick={this.toggleMenu}>	
					{this.props.children}
				</div>
				{dropdown}
				{screen}
			</div>
    	);
  	}
}

export default Menu;
