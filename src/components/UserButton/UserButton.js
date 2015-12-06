/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './UserButton.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Menu from '../Menu';

@withStyles(styles)
class UserButton extends Component {
	constructor() {
		super();
		this.state = {menuItems: [{
			text: 'Logout',
			url: '/logout'
		}]};
	}
	
	static propTypes = {
		className: PropTypes.string,
	};

	render() {
		return (
			<Menu className={classNames(this.props.className, 'UserButton')} items={this.state.menuItems}>
				<div>
					<span className="fa-stack">
  						<i className="fa fa-square-o fa-stack-2x"></i>
  						<i className="fa fa-user fa-stack-1x"></i>
					</span>
				</div>
			</Menu>
    		);
  	}
}

export default UserButton;
