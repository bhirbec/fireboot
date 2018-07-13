import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'


class App extends React.Component {
  render() {
    return <div className="test-bg-img">
      Congrats! Setup is completed!
      <img src={require('./images/android-logo.png')} />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
