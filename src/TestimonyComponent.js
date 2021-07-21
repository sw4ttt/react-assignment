import React from "react";

import { SaveTestimony } from './utils.js';


export default class TestimonyComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      age: null,
      testimony: null,
      selectedFile: null
    }
    console.log("constructor props=",this.props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleInputChange= (event) => {
    const target = event.target;

    console.log("target handleInputChangeTestimony=",event)

    var out = this.state;

    if(target.name === "age")
      out.age = target.value;

    if(target.name === "testimony")
      out.testimony = target.value;

    if(target.name === "selectedFile")
      out.selectedFile = target.files[0];
    
    this.setState(out); 
  }

  handleSubmit(event) {

    event.preventDefault();

    console.log('handleSubmitTestimony submitted: ',this.state);

    if(this.state.age === null || this.state.testimony === null || this.state.selectedFile === null){
      alert("SELECCIONA ALGO")
    }
    else{

        SaveTestimony(this.state.age, this.state.testimony, this.state.selectedFile,(err,response)=>{

            console.log("SaveTestimony=",err,response)

            if(err)
                alert(err)

            
        })
    } 

  }

  render() {
    return (
      <div class="center">
        <h1>Testimony:</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            Age:
            <input
              name="age"
              type="number"
              min="10" max="100"
              onChange={this.handleInputChange} 
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Testimony:
            <input
              name="testimony"
              type="text"
              onChange={this.handleInputChange} 
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Picture:
            <input
              name="selectedFile"
              type="file"
              onChange={this.handleInputChange} 
            />
          </label>
          <br></br>
          <br></br>
          <input
            type='submit'
          />
        </form>
        
      </div>
    );
  }
}