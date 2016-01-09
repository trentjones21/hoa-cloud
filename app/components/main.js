var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;


var jwt = require('../services/jwt');
var roles = jwt.get('roles');

var App = require("./app.js");
var Home = require("./home.js");
var Login = require("./Login");
var Register = require("./Register");

var FilesPage = require("./FilesPage");
var FilesPagePackage = require("./FilesPage/package.json");

var HomePage = require("./HomePage");
var HomePagePackage = require("./HomePage/package.json");


require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../css/app.css");

var appSubRoutes = [ {
		name: 'files',
		path: '/files',
		component: FilesPage,
		package: FilesPagePackage		
	},{
		name: 'home',
		path: '/home',
		component: HomePage,
		package: HomePagePackage
	}
];

var routes = (
	<Router>
		<Route name="app" path="/" component ={App}>
			<IndexRoute component = {Home} />
			{
				appSubRoutes.map(function(route) {
					if (route.package.secure && !jwt.hasValidToken()) {
						return (<Route key={route.name} path={route.path} />);
					} else {
						return (<Route key={route.name} path={route.path} component={route.component} />);
					}
				})
			}
		</Route>
		<Route name='login' path='/login' component={Login} />
		<Route name='register' path='/register' component={Register} />
	</Router>
);

ReactDOM.render(routes, document.getElementById('content'));
