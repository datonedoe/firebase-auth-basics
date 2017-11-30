import React, { Component } from 'react';
const firebase = require('firebase');
const uuid = require("uuid");

var config = {
    apiKey: "AIzaSyBUPxkyb_ZMlODe9ddjV2iYkHKBON54yD0",
    authDomain: "usurvey-a4f68.firebaseapp.com",
    databaseURL: "https://usurvey-a4f68.firebaseio.com",
    projectId: "usurvey-a4f68",
    storageBucket: "usurvey-a4f68.appspot.com",
    messagingSenderId: "535963080912"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    }
  }

  nameSubmit = () => {
    var studentName = this.refs.name.value;
    this.setState( {studentName: studentName}, () => {
      console.log(this.state)
    })
  }

  answerSelected = (event) => {
    var answers = this.state.answers;
    if (event.target.name === 'answer1') {
      answers.answer1 = event.target.value;
    }
    if (event.target.name === 'answer2') {
      answers.answer2 = event.target.value;
    }
    if (event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
    }
    this.setState({answers: answers}, () => {console.log(this.state)})
  }

  questionSubmit = () => {
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    })

    this.setState({isSubmitted: true})
  }

  render()  {

    let studentName;
    let questions;

    if (this.state.studentName==="" && this.state.isSubmitted ===false) {
      studentName = (
        <div>
          <h1>Hey student, please let us know your name: </h1>
          <form onSubmit={this.nameSubmit}>
            <input className="namy" type="text" placeholder="Enter your name" ref="name" />
          </form>
        </div>
      );
    questions = ""
  } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
    studentName = <h1>Hey {this.state.studentName}, welcome to U-survey</h1>;
    questions = (
      <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card">
            <label>What kind you courses you like the most</label> <br/>
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/>Technology
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/>Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/>Marketing
          </div>

          <div className="card">
            <label>What describes you?</label> <br/>
            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/>Student
            <input type="radio" name="answer2" value="In-job" onChange={this.answerSelected}/>Injob
            <input type="radio" name="answer2" value="Looking for a job" onChange={this.answerSelected}/>Looking for a job
          </div>

          <div className="card">
            <label>Salary range?</label> <br/>
            <input type="radio" name="answer3" value="$10,000.00" onChange={this.answerSelected}/>$10,000.00
            <input type="radio" name="answer3" value="$20,000.00" onChange={this.answerSelected}/>$20,000.00
            <input type="radio" name="answer3" value="$30,000.00" onChange={this.answerSelected}/>$30,000.00
          </div>
          <input className="feedback-button" type="submit" value="Submit"/>
        </form>
      </div>
    );
  } else if (this.state.isSubmitted === true) {
    studentName = <h1>Thank you {this.state.studentName} for taking the survey</h1>
  }

    return (
      <div>
        {studentName}
        -----
        {questions}
      </div>
    )
  }
}

export default Usurvey;
