var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./app.js");
var Home = require("./home.js");
var List = require("./list.js");
var Login = require("./login.js");
var Register = require("./Register");
var FilesPage = require("./FilesPage");

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../css/app.css");

var routes = (
  <Router>
    <Route name="app" path="/" component ={App}>
      <IndexRoute component = {Home} />
      <Route name="list" path="/list" component={List} />
      <Route name="files" path="/files" component={FilesPage} />
      <Route name="active" path="/list/active" component={List} />
      <Route name="completed" path="/list/completed" component={List} />
    </Route>
	<Route name='login' path='/login' component={Login} />
	<Route name='register' path='/register' component={Register} />

  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
