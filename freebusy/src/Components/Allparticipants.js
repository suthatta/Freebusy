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
                Id : {item.id}
                Name :{item.name}
                <br></br>
                {console.log('itemsbusy',item.busy.map())}
                Busy :{item.busy.map(i => (
                  <li key={i.id}>
                    Start:{i.start}
                    End : {i.end}
                    </li>
                ))}
              

               
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}
