/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './UserButton.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class UserButton extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	render() {
		return (
			<div className={classNames(this.props.className, 'UserButton')}>
				<span className="fa-stack">
  					<i className="fa fa-square-o fa-stack-2x"></i>
  					<i className="fa fa-user fa-stack-1x"></i>
				</span>
			</div>
    	);
  	}
}

export default UserButton;
