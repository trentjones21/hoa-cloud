var React = require("react");
var ReactRouter = require("react-router");
var classNames = require('classnames');
var styles = require('./HOASearch.css');
var Link = ReactRouter.Link;
var API = require('../../services/api');
var _ = require('underscore');


var HOASearch = React.createClass({
	componentWillMount: function() {
		var self = this;
		this.setState({hoas: null, visibleHoas: []});
		API.hoa.getAll().then(function(data) {
			self.setState({hoas: data.data, visibleHoas: []});
		});
	},
	onChange: function(t) {
		var prefix = t.target.value;
		var visible = _.filter(this.state.hoas, function(hoa) {
			var item = hoa.name.toLowerCase();
			prefix = prefix.toLowerCase();
			return  prefix.length >= 3 && item.slice(0, prefix.length) == prefix; 
		});
		this.setState({visibleHoas: visible.slice(0,8)});
	},
	setSelectedHoa: function(hoa) {
		this.setState({selectedHoa: hoa});
		this.props.onHoaSelect(hoa);
	},
	render: function() {
		var self = this;
    	return (
      		<div className="HOASearch">
				<input type='text' placeholder='HOA Name' className='input' onChange={this.onChange}/>	
				<div className='results'>
					{ this.state.visibleHoas.map(function(item) {
						return <div className='hoa-result' key={item.id} onClick={self.setSelectedHoa.bind(null,item)}>{item.name}</div>
					}) }
				</div>
      		</div>
    	);
  	}
});

module.exports = HOASearch;
