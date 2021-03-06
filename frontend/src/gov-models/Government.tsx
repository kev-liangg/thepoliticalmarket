import React from "react";
import { BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Contractors from "./Contractors";
import Contracts from "./Contracts";
import States from "./State";
function Government(){
    return (
        <Router>
        <div>
            <nav>
            <h1> This is the home page for Government Models</h1>
        <li>
          <Link to = "/Contractors">Contracters</Link>
        </li>
        <li>
          <Link to = "/Contracts">Government Contracts</Link>
        </li>
        <li>
          <Link to = "/state">States</Link>
        </li>
        </nav>
        <Switch>
      <Route exact path = "/Contractors" component = {Contractors}/>
      <Route path = "/Contracts" component = {Contracts}/>
      <Route path = "/state" component = {States}/>
      </Switch>
        </div>
        </Router>
    );
}
export default Government