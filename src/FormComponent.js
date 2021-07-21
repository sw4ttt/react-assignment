import React from "react";

import * as Lodash from "lodash";

import { SaveSurvey } from './utils.js';


export default class FormComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      answers: {},
      age: null,
      testimony: null,
      selectedFile: null,
      questionsCheckboxes:{}
    }
    console.log("constructor props=",this.props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleInputChange = (event) => {
    const target = event.target;

    var answers = Lodash.cloneDeep(this.state.answers);
    var questionsCheckboxes = Lodash.cloneDeep(this.state.questionsCheckboxes);

    console.log("answers=",answers)
    console.log("target=",target.id,target.name, target.checked)

    if(target.checked){
      if(!Lodash.has(this.state.answers,target.id))
        answers[target.id] = {}

      console.log("answers 2=",answers)
      answers[target.id][target.name] = true;

      if(!this.state.questionsCheckboxes[target.id])
        questionsCheckboxes[target.id] = {
          count: 0,
          option: ''
        };

      questionsCheckboxes[target.id].count++;
      questionsCheckboxes[target.id].option = target.name;

    }
    else{
      if(this.state.answers[target.id]){
        delete answers[target.id][target.name];
      }
      questionsCheckboxes[target.id].count--;
    }
    
    this.setState((state, props)=>{
      return {
        answers: answers,
        questionsCheckboxes: questionsCheckboxes
      }
    }); 
  }

  handleSubmit(event) {

    console.log('submitted: ',this.state.answers);
    event.preventDefault();

    let completeForm = true;

    Lodash.forEach(this.state.questions,(question)=>{
      
      if(Lodash.isEmpty(this.state.answers[question.idQuestion]))
        completeForm = false;
    })

    if(!completeForm){
      alert("You must answer all questions.")
    }
    else{
      SaveSurvey(this.state.answers,(err,response)=>{
        console.log("SaveSurvey",err,response);
        if(err){
          alert(err)
        }
        else{
          alert("Saved.")
        }
      })
    }
  }

  render() {
    return (
      <div class="center">
        <h1>Survey:</h1>
        <form class="center" onSubmit={this.handleSubmit}>
          {this.props.questions.map((question) => (
            <div class="center">
              <label>
                <div class="questionText">
                {question.idQuestion}
                </div>
                
                <br></br>
                {question.options.map((option) => (
                  <label class="space">
                    {option}
                    <input
                      disabled={
                        question.type === 'single'
                        && this.state.questionsCheckboxes[question.idQuestion] 
                        && this.state.questionsCheckboxes[question.idQuestion].count>0 
                        && this.state.questionsCheckboxes[question.idQuestion].option.toString() !== option.toString()}
                      name={option}
                      id={question.idQuestion} 
                      type="checkbox"
                      onChange={this.handleInputChange} 
                    />
                  </label>
                ))}
              </label>
              <br></br>
            </div>
          
          ))}
          <div class="center space">
            <input 
              type='submit'
            />
          </div>
        </form>        
      </div>
    );
  }
}