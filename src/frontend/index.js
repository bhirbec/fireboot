import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  render() {
    return <div>
      Congrats! Setup is completed!
      <img src={require('./images/android-logo.png')} />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
