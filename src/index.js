//import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import RsvpList from './components/RsvpList';
import Header from './shared/Header';
ReactDOM.render(
    <React.Fragment>
    <Header />
        <Router>
            <Route exact path="/">
                <App/>
            </Route>
            <Route path="/rsvp">
                <RsvpList  />
            </Route>
        </Router>
    </React.Fragment>,
    document.querySelector('#root')
);

