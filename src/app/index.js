import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


class App extends React.Component {
  componentDidMount() {
    firebase.database().ref('/env').once('value').then(snap => {
      this.setState({env: snap.val()});
    });
  }

  render() {
    if (this.state == null) {
      return 'Loading...';
    }

    return <div>User {this.props.user.displayName} logged in on {this.state.env}</div>;
  }
}

window.startApp = function(firebaseConfig) {
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      ReactDOM.render(<App user={user} />, document.getElementById('app'));
    } else {
      window.location = '/signin.html';
    }
  });
};
