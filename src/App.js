import { ConnectedRouter } from 'connected-react-router';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { history } from './store'
import { ProtectedRouter } from './reusable'
import './scss/style.scss';
// Containers
import TheLayout from './containers/TheLayout'

// Pages
import Login from './views/pages/login/Login'
import Register from './views/pages/register/Register'
import Page404 from './views/pages/page404/Page404'
import Page500 from './views/pages/page500/Page500'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
              <ProtectedRouter path="/" name="Home" component={TheLayout} />
            </Switch>
          </ConnectedRouter>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
