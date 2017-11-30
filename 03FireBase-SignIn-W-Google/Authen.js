import React, { Component } from 'react';
var firebase = require('firebase');

// Initialize Firebase
var config = {

  apiKey: "AIzaSyAvL0sz_ghtT62gD_qKMdLT5BzDZQSg68Q",
  authDomain: "usurvey2-1e72e.firebaseapp.com",
  databaseURL: "https://usurvey2-1e72e.firebaseio.com",
  projectId: "usurvey2-1e72e",
  storageBucket: "usurvey2-1e72e.appspot.com",
  messagingSenderId: "631372233710"

};
firebase.initializeApp(config);





class Authen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      err: "",
      logOutClass: "hide"
    }
  }

  login = (event) => {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,  password);

    promise
    .then(user => {
      // var lout = document.getElementById("logout");

      //remove class
      this.setState({logOutClass: ""})
    })
    .catch( e => {
        let err = e.message;
        console.log("Error", err);
        this.setState({err: err});
      })
  }

  signup = () => {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
      .then(user => {
          var err = "Welcome " + user.email;
          firebase.database().ref("users/"+user.uid).set({
            email: user.email
          });
          console.log(user);
          this.setState({err: err});
        })
      .catch(e =>{
        var err = e.message;
        console.log(err);
        this.setState({
          err: err
        })
      });
  }

  logout = () => {
    firebase.auth().signOut();
    // var lout = document.getElementById("logout");

    //add class
    this.setState({logOutClass: "hide"})
  }

  google = () => {
    console.log("I am in google method")

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise
    .then( result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      })
    })
    .catch ( e => {
      var msg = e.message;
      console.log(msg);
    })
  }


  render() {
    return (
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email"/><br />
        <input id="password" ref="password" type="password" placeholder="Enter your password"/><br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className={this.state.logOutClass}>Log Out</button>
        <button onClick={this.google} id="google" className="google">Sign In With Google </button>
      </div>
    )
  }
}

export default Authen;
