/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './BillPayPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class BillPayPage extends Component {

  	static contextTypes = {
    	onSetTitle: PropTypes.func.isRequired,
  	};

  	render() {
    	const title = 'Bill Pay';
    	this.context.onSetTitle(title);
    	return (
      		<div className="ContactPage">
        		<div className="ContactPage-container">
          			<h1>{title}</h1>
          			<script src="https://slice.cmsonline.com/js/slice.js" data-token="5af665f5db875f0c943b46bb7339d672"></script>
        		</div>
      		</div>
    	);
  	}

}

export default BillPayPage;
