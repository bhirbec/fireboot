import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import _ from 'firebase/database';


class App extends React.Component {
  componentDidMount() {
    firebase.database().ref('/env').once('value').then(snap => {
      this.setState({env: snap.val()});
    });
  }

  render() {
    return <div>{this.state ? this.state.env : 'Loading...'}</div>;
  }
}

// Initialize Firebase
const config = require('../config/web.' + ENV + '.json');
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('app'));
