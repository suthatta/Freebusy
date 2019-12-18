import React, { Component } from 'react'
    
export default class SelectByName extends Component {
    constructor(props) {
      super(props)
      this.state = {
        items: [],
        isLoaded: false,
        searchName:'Anna Person',
      }
    }
    updateSearch(event){
     // console.log('Yoo')
     this.setState({
        searchName: event.target.value
     })
    }
    componentDidMount(search) {
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
            <h3>Search Name</h3>          
           <input type="text" name="Id" value={this.state.searchName} 
                  onChange={this.updateSearch.bind(this)} />
          <div className="showData">
          {items.map(item => 
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
                ).filter(item => item.id === this.state.searchName)}
          </div>
          </div>
        )
      }
    }
  }
  