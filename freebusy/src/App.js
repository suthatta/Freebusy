import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Home from './Components/Home'
import Allparticipants from './Components/Allparticipants'
import SelectByID from './Components/SelectByID'
import SelectByName from './Components/SelectByName'
//import Other from  './Components/Other'
export default class App extends Component {
  navItems = [
    'Home', 'Allparticipants', 'SelectByID'
  ]
  render() {
    return (<div>
      <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/allparticipats">Allparticipants</Link>
        </li>
        <li>
          <Link to="/selectbyid">ID</Link>
        </li>
        <li>
          <Link to="/selectbyname">name</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/allparticipats"><Allparticipants /></Route>
        <Route exact path="/selectbyid"><SelectByID  /> </Route>
        <Route exact path="/selectbyname"><SelectByName /></Route>
      </Switch>
    </Router>
  
    </div >
    )
  }
}