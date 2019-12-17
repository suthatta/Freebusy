import React,{Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Home from './Components/Home'
import Allparticipants from './Components/Allparticipants'
import SelectByID from './Components/SelectByID'
//import SelectByName from './Components/SelectByName'
//import Other from  './Components/Other'

class App extends Component {
  navItems = [
    'Home', 'Allparticipants', 'SelectByID'
  ]
  render() {
    return (<div>
      <Router>
          <nav className="nav-lists">
            {this.navItems.map(item => {
              return (
                <li className="nav-list-item" key={item}> <Link to={`/${item.toLowerCase()}`}>{item}</Link></li>
              )
            })}
          </nav>

          <main>

            <Switch>
              <Route path="/Home">
                <Home />
              </Route>
              <Route path="/Allparticipants">
              <Allparticipants/>
              </Route>
              <Route path="SelectByID">
                <SelectByID />
              </Route>
            </Switch>

          </main>
        </Router >
    </div >
    )
  }
}

export default App;