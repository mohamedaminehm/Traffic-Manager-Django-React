import React , { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';

import Login from './accounts/Login';
import Register from './accounts/Register';
import Analytics from './map/Analytics';
import AccAnalytics from './acc_tracker/AccAnalytics';
import TrafficAlert from './traffic_alert/TrafficAlert';
import Visualisation from './visualisation/Visualisation';
import ControlePanel from './controle/ControlePanel';

import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';

import { loadUser } from '../actions/auth';

import { HashRouter as Router, Route, Switch , Redirect } from 'react-router-dom';



import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Chaine1 from './villes/Chaine';
import Create from './posts/Create';
import List from './posts/List';
import Chaine2 from './villes/Chaine2';
import ManControl from './controle/ManControl';
//import ResponsivePlayer from './video/ResponsivePlayer';
//import { Rounds } from './rouds/Rounds';


//Alert Options
const alertOptions = {
	timeout: 3000,
	position: positions.BOTTOM_CENTER,
	transition: transitions.SCALE,
	offset: '30px',
	containerStyle: {
		zIndex: 100
	  }
};

class App extends Component {
	componentDidMount(){
		store.dispatch(loadUser());
	};
	render() {
		return(
			<Provider store={store} style= {{ backgroudColor : 'red' }} >
				<AlertProvider template={AlertTemplate}
				{...alertOptions}>
					<Router>
						<Fragment>
							<Header />
							<Alerts />
							<div className="container">
								<Switch>
									<PrivateRoute exact path="/" component={Dashboard} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/analytics" component={Analytics} />
									<Route exact path="/Visualization" component={AccAnalytics} />
									<PrivateRoute exact path="/post" component={Create} />
									<PrivateRoute exact path="/posts" component={List} />
									<PrivateRoute exact path='/chaine1' component={Chaine1} />
									<PrivateRoute exact path='/chaine2' component={Chaine2} />
									<PrivateRoute exact path='/mapalert' component={TrafficAlert} />
									<PrivateRoute exact path='/realstat' component={Visualisation} />
									<PrivateRoute exact path='/controle' component={ControlePanel} />
									<PrivateRoute exact path='/manuelle' component={ManControl} />

								</Switch>
							</div>
							
						</Fragment>
					</Router>
				</AlertProvider>
			</Provider>
		);
	}
}

ReactDOM.render(<App /> , document.getElementById('app'));