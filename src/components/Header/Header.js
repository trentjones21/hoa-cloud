/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {
	render() {
    	return (
      		<div className="Header">
          		<h1>Apple Valley</h1>
      		</div>
    	);
  	}
}

export default Header;
