import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import RsvpList from './components/RsvpList';
import Header from './shared/Header';
import Error from '../src/components/Error'
ReactDOM.render(
  <React.Fragment>
  <Header />
  <Router>
    <Switch>
      <Route exact path="/">
          <App/>
      </Route>
      <Route path="/rsvp">
          <RsvpList  />
      </Route>
      <Route path="/error">
          <Error />
      </Route>
      <Route>
          <Error />
      </Route>
    </Switch>
  </Router>
  </React.Fragment>,
  document.querySelector('#root')
);

