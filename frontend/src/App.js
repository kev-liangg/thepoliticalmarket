import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Contractors from "./gov-models/Contractors";
import Government from "./gov-models/Government";
import Members from "./cf-models/Members";
import CfTJOssoff from "./cf-models/CfTJOssoff";
import CfJHarrison from "./cf-models/CfJHarrison";
import CfRWarnock from "./cf-models/CfRWarnock";

import {NavigationBar} from "./Components/NavigationBar";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
        <NavigationBar/>
          <Switch>
            <Route exact path = "/Government" component = {Government} />
            <Route exact path = "/Contractors" component = {Contractors} />
            <Route exact path = "/CampFin" component = {Members} />
            <Route exact path = "/CampFin/TJOssoff" component = {CfTJOssoff} />
            <Route exact path = "/CampFin/JHarrison" component = {CfJHarrison} />
            <Route exact path = "/CampFin/RWarnock" component = {CfRWarnock} />
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
