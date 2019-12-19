import React, { Component } from 'react'
import './SelectByID.css'

export default class SelectByID extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: false,
      search:'12345',
    }
  }
  updateSearch(event){
   // console.log('Yoo')
   this.setState({
     search: event.target.value
   })
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
  getEmpId(e){
    const { items, search} = this.state;
    const ids = items.map(emp => emp.id);
    const filteredIds = ids.filter(id =>id === this.state.search);
    return filteredIds;

  }
  render() {
    const { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading....</div>
    } else {
      return (
        <div className="wrapper">
          <h3>Search ID</h3>          
         <input type="text" name="Id" value={this.state.search} 
                onChange={this.updateSearch.bind(this)} />
        <div className="showData">
          {this.getEmpId}
        </div>
        </div>
      )
    }
  }
}
