/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

var List = React.createClass({
    render: function() {
        return (
        	<div>
        		{this.props.data.map(function(item) {
					return <a className="Sidebar-link" href={item.link}><div className="Sidebar-item">{item.text}</div></a>
            	})}
        	</div>
        );
    }
});
var items =  [
	{text: 'Home', link: '/'}, 
	{text: 'Admin', link: '/admin'}, 
	{text: 'Files', link: 'files'}, 
	{text: 'Bill Pay', link: 'bill-pay'}, 
];



@withStyles(styles)
class Sidebar extends Component {

	static propTypes = {
		className: PropTypes.string,
    };

    render() {
      	return (
        	<div className={classNames(this.props.className, 'Sidebar')} role="navigation">
          		<List data={ items } />
          	</div>
      	);
    }
}



export default Sidebar;
