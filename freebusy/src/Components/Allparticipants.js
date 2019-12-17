import React, { Component } from 'react'

export default class Allparticipants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: false,
    }
  }
  componentDidMount() {
    fetch('/api/all')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }

  render() {
    const { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading....</div>
    } else {
      return (
        <div className="wrapper">
          <h3>All Participants</h3>
          <ul>
            <div> {items.map(item => 
            <li key ={item.id}>
              <p>ID: {item.id} </p> 
               <p>Name: {item.name}</p>
                <p>Busy:{item.busy.map(i => (
                        <li>
                          Start:{i.start}
                          End : {i.end}
                        </li>))}
                </p>
                )
              }

            </li>            
              
            )}</div>
           
          </ul>
        </div>
      )
    }
  }
}
