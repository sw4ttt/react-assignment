import React from "react";
import axios from "axios";
import "./styles.css";

export default class ResultsComponent extends React.Component {
  state = {
    loading: true,
    data: [],
  };
  componentDidMount() {
    axios.get("/api/survey/all").then((response) => {
      console.log("response all=",response)
      this.setState({ 
        loading: false,
        data: response.data
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
        <div class="center">
            <h1>Results:</h1>
            <table class="space center">
                <tr>
                {this.state.data.surveys.map((question) => (
                    <th class="line">
                      {question.max.percentage}
                      <br></br>
                      <span class="smallText">of respondents selected <br></br> {question.max.answer}</span>
                    </th>
                ))}
                </tr>
            </table>

            <br></br>
            <br></br>
            <br></br>

            <table class="space center">
                <tr>
                {this.state.data.testimonial.map((item) => (
                  <th class="box">
                      <img src={item.imagePath} alt={item.imagePath}></img>
                      <br></br>
                      {item.age}
                      <br></br>
                      {item.testimony}
                  </th>
                ))}
                </tr>
            </table>
        </div>
      );
    }
    
  }
}