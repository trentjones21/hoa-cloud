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
      <div className="BillPayPage">
        <div className="BillPayPage-container">
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default BillPayPage;
