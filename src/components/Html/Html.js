/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId } from '../../config';

class Html extends Component {

	static propTypes = {
		title: PropTypes.string,
		description: PropTypes.string,
		css: PropTypes.string,
		body: PropTypes.string.isRequired,
	};

	static defaultProps = {
		title: '',
		description: '',
	};

	trackingCode() {
		return ({__html:
			`(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
				`function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
			`e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
			`e.src='https://www.google-analytics.com/analytics.js';` +
			`r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
			`ga('create','${googleAnalyticsId}','auto');ga('send','pageview');`,
		});
	}

	render() {
		return (
			<html className="no-js" lang="">
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<title>{this.props.title}</title>
					<meta name="description" content={this.props.description} />
					<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0" />
					<style id="css" dangerouslySetInnerHTML={{__html: this.props.css}} />
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
				</head>
				<body>
					<div id="app" dangerouslySetInnerHTML={{__html: this.props.body}} />
					<script src="/app.js"></script>
					<script dangerouslySetInnerHTML={this.trackingCode()} />
				</body>
			</html>
			);
	}

}

export default Html;
