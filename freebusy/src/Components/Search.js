import React, { Component } from 'react'
import axios from 'axios'



export default class Search extends Component {
    URL ="https://10degrees.uk/wp-json/wp/v2/posts"
    state ={
        name:[],
        allNames:[]
    }
    componentDidMount(){
        axios
        .get(URL, {
            headers:{
                Accept:"application/json",
                "Conten-Type": "application/json"
            }
        })
        .then(({data})=> {
            this.setState({
                name: data, 
                allnames: data //array data from JSON stored in thes
            });
        })
        .catch(err => {});
    }
    onKeyUp = e =>{
        //filter name list by title using onKeyUp function
        const name = this.state.allNames.filter(item =>
            item.title.rendered.toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
        this.setState({name});
    };

    render() {
        return(
            <div className="container">
                <div className="serach-outer">
                    <form>
                        role="serach"
                        methode="get"
                        id="searchform"
                        className="searchform"
                        action=""
                  
                    {/* input field activeates onKeyUp function on state change */}
                    <input>
                    type="serach"
                    onChange ={this.onKeyUp}
                    name="s"
                    id="s"
                    placeholder="Search Name"
                    </input>
                    <button type="submit" id="searchsubmit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                    </form>
                </div>
                <ul className="data-list">
                    {/*name items mapped in a list linked to onKeyUp function */}
                    {this.state.name.map((item, index)=>(
                        <li className={"block-" +index}>
                            <a className="title" herf={item.link}>
                                <h3>{item.title.rendered}</h3>
                            </a>
                            <a className="link" herf={item.link}>
                                <p>Read more</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}