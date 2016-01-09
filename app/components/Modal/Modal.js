var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./Modal.css');

var Modal = React.createClass({
	getInitialState: function() {
		return {}
	},
	render: function() {
    	return (
			<div className='Modal' onContextMenu={this.onContextMenu}>
				{
					this.props.display ?
						<div>
							<div className='screen' onClick={this.props.toggle} ></div>
							<div className='inner-modal' >
								{this.props.children}
							</div>
						</div>
					: ''
				}
			</div>
    	);
  	}
});

module.exports = Modal;

