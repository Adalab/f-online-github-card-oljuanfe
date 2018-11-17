import React, { Component } from 'react';
import AllUsersSelect from './AllUsersSelect';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      adalabMembersInfo: [],
      adalabUsers: [],
    }
    this.fetchAdalabInfo = this.fetchAdalabInfo.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
  }

  componentDidMount() {
    this.fetchAdalabInfo();
  }

  fetchAdalabInfo() {
    console.log('consiguiendo info');
    fetch('https://api.github.com/orgs/Adalab/members?per_page=200')
    .then(response =>  response.json())
    .then(json => {
      console.log('json', json);
      this.setState({
        adalabMembersInfo: json
      });
      return json;
    })
    .then(json => {
      const adalabMembers = [];
      json.forEach(item => {
        adalabMembers.push({userName: item.login, id: item.id});
      })
      console.log('adalab,member', adalabMembers);
      this.setState({adalabUsers: adalabMembers});
    });
  }

  handleSelectClick() {
    console.log('CLICKANDO')
  }

  render() {
    const {adalabUsers} = this.state;
    console.log('state', this.state);
    return (
      <div className="App">
        <header className="App-header">
          Hello
        </header>
        <main>
          <AllUsersSelect adalabUsers={adalabUsers} handleSelectClick={this.handleSelectClick}/>
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
