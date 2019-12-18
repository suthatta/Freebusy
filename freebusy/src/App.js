import React, {Component} from 'react'
import Home from './Components/Home'
import Allparticipants from './Components/Allparticipants'
import SelectByID from './Components/SelectByID'
import SelectByName from './Components/SelectByName'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

//import Other from  './Components/Other'

export default function defaultExample() {

  return(
    <div>
       <Router>
      <header >
      <h3 className="App-header">Freebusy Booking</h3>
     <div className="menubar">
     <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Allparticipants">Allparticipants</Link>
        </li>
        <li>
          <Link to="/SelectByID">SelectByID</Link>
        </li>
        <li>
          <Link to="/SelectByName">SelectByName</Link>
        </li>
      </ul>
     </div>
     
      </header>    
     
      <main className="container">
       <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/SelectByID"><SelectByID /></Route>
        <Route exact path="/Allparticipants"><Allparticipants /></Route>    
        <Route exact path="/SelectByName"><SelectByName /></Route>
      </Switch>
     </main>
      
    </Router>
    </div>
  )

}
  