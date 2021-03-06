import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Contractors from "./gov-models/Contractors";
import Government from "./gov-models/Government";
import {NavigationBar, About} from "./Components";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
        <NavigationBar/>
          <Switch>
            <Route exact path = "/Government" component = {Government} />
            <Route exact path = "/Contractors" component = {Contractors} />
            <Route exact path = "/About" component = {About} />
            {/* <Route path = "/gov-models/Contracts" component = {Contracts} />
            <Route path = "/gov-models/State" component = {State} /> */}
            {/* <Route component = {NoMatch} /> */}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
