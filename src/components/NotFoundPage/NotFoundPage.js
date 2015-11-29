/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './NotFoundPage.css';
import Link from '../Link'
@withStyles(styles)
class NotFoundPage extends Component {

  	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
  	};

  	render() {
		const title = 'Page Not Found';
		this.context.onSetTitle(title);
		this.context.onPageNotFound();
		return (
	  		<div>
				<h1>{title}</h1>
				<p>Sorry, but the page you were trying to view does not exist.</p>
				<a href='/' onClick={Link.handleClick}>
					<p>Back to home</p>
				</a>
	  		</div>
		);
  	}
}

export default NotFoundPage;
