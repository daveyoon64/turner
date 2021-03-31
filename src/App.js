import React, {Component} from 'react';
import './App.css';
import {testGet} from './HNservice'

class App extends Component {
  
  componentDidMount() {
    testGet()
      .then(item => console.log(item))
    console.log()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Jack Reactor: A Hacker News Clone
        </header>
        <div className="Feed-list">
          <p>Stories go here man</p>
          <p>Intel is Dope Again</p>
          <p>Apple changes name to Banana</p>
        </div>
        <div className="Footer">
          <p>Made with love Muwwwahahhhhh</p>
          <button>Back</button>
        </div>
      </div>
    );
  }
}

export default App;