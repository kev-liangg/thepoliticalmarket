import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Government from "./gov-models/Government";
import Contractors from "./gov-models/Contractors";
import Contracts from "./gov-models/Contracts";
import ContractSearchPage from "./gov-models/ContractSearchPage";
import States from "./gov-models/States";
import Members from "./cf-models/Members";
import MemberPage from "./cf-models/MemberPage";
import MemberSearchPage from "./cf-models/MemberSearchPage";
import ContractPage from "./gov-models/ContractPage";
import StockPage from "./sto-models/StockPage";
import Stocks from "./sto-models/Stocks";
import StockSearchPage from "./sto-models/StockSearchPage";
import {NavigationBar, About, Home, SiteSearch} from "./Components";
class App extends Component {
  render() {
    return (
      
      <React.Fragment>
        <Router>
        <NavigationBar/>
        <header className="App-background">
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/Government" component = {Government} />
            <Route exact path = "/Stocks" component = {Stocks} />
            <Route exact path = "/Stocks/Search" component = {StockSearchPage} />
            <Route exact path = "/Government/Contractors" component = {Contractors} />
            <Route exact path = "/Government/States" component = {States} />
            <Route exact path = "/Contracts" component = {Contracts} />
            <Route exact path = "/Contracts/Search" component = {ContractSearchPage} />
            <Route exact path = "/CampFin" component = {Members} />
            <Route exact path = "/CampFin/Search" component = {MemberSearchPage} />
            <Route path = "/CampFin/:candId" component = {MemberPage} />
            <Route exact path = "/About" component = {About} />
            <Route path = "/Contracts/:awardId" component = {ContractPage} />
            <Route path = "/Stocks/:symbol" component = {StockPage} />
            <Route exact path = "/SiteSearch" component = {SiteSearch} />
            {/* <Route path = "/gov-models/Contracts" component = {Contracts} />
            <Route path = "/gov-models/State" component = {State} /> */}
            {/* <Route component = {NoMatch} /> */}
          </Switch>
          </header>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
