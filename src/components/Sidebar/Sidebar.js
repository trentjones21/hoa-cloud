/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Navigation extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this);
	}

	static propTypes = {
		className: PropTypes.string,
	};

	handleClick(click) {
		Link.handleClick(click);
		this.props.toggleMenu();
	};

	render() {
		return (
			<div className={classNames(this.props.className, 'Sidebar')}>
				<div className='Sidebar-menu' onClick={this.props.toggleMenu}>
					<h1>Menu</h1>
					<a href='/' onClick={this.handleClick}>
						<div className='menu-item'>
							<i className='fa fa-home'></i>
							Home
						</div>
					</a>
					<a href='/admin' onClick={this.handleClick}>
						<div className='menu-item'>
							<i className='fa fa-star'></i>
							Admin
						</div>
					</a>
					<a href='/files' onClick={this.handleClick}>
						<div className='menu-item'>
							<i className='fa fa-folder'></i>
							Files
						</div>
					</a>
					<a href='/bill-pay' onClick={this.handleClick}>
						<div className='menu-item'>
							<i className='fa fa-credit-card-alt'></i>
							Bill pay
						</div>
					</a>
				</div>
			</div>
    	);
  	}
}

export default Navigation;
