import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Government from "./gov-models/Government";
import Contractors from "./gov-models/Contractors";
import Contracts from "./gov-models/Contracts";
import States from "./gov-models/States";
import Members from "./cf-models/Members";
import CfTJOssoff from "./cf-models/CfTJOssoff";
import CfJHarrison from "./cf-models/CfJHarrison";
import CfRWarnock from "./cf-models/CfRWarnock";

import Stocks from "./sto-models/stockTrends"
import DELL from "./sto-models/sto-instances/DELL"
import HPQ from "./sto-models/sto-instances/HPQ"
import GOOG from "./sto-models/sto-instances/GOOG"
import {NavigationBar, About, Home} from "./Components";
class App extends Component {
  render() {
    return (
      <header className="App-background">
      <React.Fragment>
        <Router>
        <NavigationBar/>
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/Government" component = {Government} />
            <Route exact path = "/Stocks" component = {Stocks} />
            <Route exact path = "/Government/Contractors" component = {Contractors} />
            <Route exact path = "/Government/States" component = {States} />
            <Route exact path = "/Government/Contracts" component = {Contracts} />
            <Route exact path = "/CampFin" component = {Members} />
            <Route exact path = "/CampFin/TJOssoff" component = {CfTJOssoff} />
            <Route exact path = "/CampFin/JHarrison" component = {CfJHarrison} />
            <Route exact path = "/CampFin/RWarnock" component = {CfRWarnock} />
            <Route exact path = "/About" component = {About} />
            <Route exact path = "/DELL" component = {DELL} />
            <Route exact path = "/HPQ" component = {HPQ} />
            <Route exact path = "/GOOG" component = {GOOG} />
            {/* <Route path = "/gov-models/Contracts" component = {Contracts} />
            <Route path = "/gov-models/State" component = {State} /> */}
            {/* <Route component = {NoMatch} /> */}
          </Switch>
        </Router>
      </React.Fragment>
      </header>
    );
  }
}

export default App;
