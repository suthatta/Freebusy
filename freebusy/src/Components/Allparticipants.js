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
    fetch('/all')
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
              {console.log('items',items)}
            {items.map(item => (
              <li key={item.id}>
                Name :{item.name}
                <br></br>
               
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}
