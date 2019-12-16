import React,{Component} from 'react'

import "./App.css";
import Allparticipants from './Components/Allparticipants';

class App extends Component {

  render() {
    return (<div>
      <h3>Freebusy-Meeting app</h3>
     <div><Allparticipants/></div>
    </div >
    )
  }
}

export default App;