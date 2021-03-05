import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Contractors from "./gov-models/Contractors";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path = "/Contractors" component = {Contractors} />
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
