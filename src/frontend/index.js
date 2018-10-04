import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import _ from 'firebase/database';


class App extends React.Component {
  render() {
    return <div>
      Congrats! Setup is completed!
      <img src={require('./images/android-logo.png')} />
    </div>
  }
}

// Initialize Firebase
const config = require('../config/web.' + ENV + '.json');
firebase.initializeApp(config);

firebase.database().ref('/test').on('value', snap => {
  console.log(snap.val());
});

ReactDOM.render(<App />, document.getElementById('app'));
