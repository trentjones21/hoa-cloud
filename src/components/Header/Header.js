/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';

@withStyles(styles)
class Header extends Component {

	render() {
    	return (
      		<div className="Header">
        		<div className="Header-container">
          			<a className="Header-link" href="/" onClick={Link.handleClick}>
                  		<div className="Header-banner">
                    		<h1 className="Header-bannerTitle">Apple Valley</h1>
                  		</div>
          			</a>
        		</div>
              <Navigation className="Header-nav" />
          		<Sidebar className="Header-sidebar" />
      		</div>
    	);
  	}
}

export default Header;
