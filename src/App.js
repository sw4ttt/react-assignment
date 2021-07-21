import React from "react";
import axios from "axios";
import "./styles.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import FormComponent from "./FormComponent";
import ResultsComponent from "./ResultsComponent";
import TestimonyComponent from "./TestimonyComponent";

export default class App extends React.Component {
  state = {
    loading: true,
    questions: [],
  };
  componentDidMount() {
    axios.get("/questions.json").then((response) => {
      console.log("responseQuestions=",response)
      this.setState({ 
        loading: false,
        questions: response.data
      });
    });
  }

  render() {
    if (this.state.loading) {
      console.log("loading");
      return (
        <div>
          <label>
            Loading
          </label>
        </div>
      );
    } else {
      return (

        <Router>
        <div>

          <table>
              <tr>
                <th class="paddingAll">
                  <Link to="/">Home</Link>
                </th>
                <th class="paddingAll">
                  <Link to="/testimony">Testimony</Link>
                </th>
                <th class="paddingAll">
                  <Link to="/results">Results</Link>
                </th>
              </tr>
            </table>
  
          <hr class="thick"/>
  
          <Switch>
            <Route exact path="/">
              <FormComponent questions={this.state.questions}/>
            </Route>
            <Route path="/testimony">
              <TestimonyComponent />
            </Route>
            <Route path="/results">
              <ResultsComponent />
            </Route>
          </Switch>
        </div>
      </Router>
      );
    }
    
  }
}