import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      adalabInfo: [],
    }
    this.fetchAdalabInfo = this.fetchAdalabInfo.bind(this);
  }

  componentDidMount() {
    this.fetchAdalabInfo();
  }

  fetchAdalabInfo() {
    console.log('consiguiendo info');
    fetch('https://api.github.com/orgs/adalab')
    .then(response =>  response.json())
    .then(json => console.log('json', json));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello
        </header>
      </div>
    );
  }
}

export default App;
