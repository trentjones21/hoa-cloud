/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Navigation extends Component {
	static propTypes = {
		className: PropTypes.string,
	};

	render() {
		return (
			<div className={classNames(this.props.className, 'Navigation')} role="navigation">
				<i className='fa fa-bars menu-button' onClick={this.props.toggleMenu}></i>
			</div>
    	);
  	}
}

export default Navigation;
