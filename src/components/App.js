import React, { Component } from 'react';
import AllUsersSelect from './AllUsersSelect';
import UserCard from './UserCard';  
import '../styles/App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      adalabMembersInfo: [],
      adalabUsers: [],
      selectChosenUser: '', 
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

  handleSelectClick(event) {
    console.log('CLICKANDO');
    console.log('evento', event.currentTarget.value);
    this.setState({selectChosenUser: event.currentTarget.value });
  }

  render() {
    const {
      adalabUsers,
      selectChosenUser,
    } = this.state;
    console.log('state', this.state);
    return (
      <div className="app-wrapper">
        <header className="header">
        </header>
        <main className="main">
          <AllUsersSelect 
            adalabUsers={adalabUsers} 
            handleSelectClick={this.handleSelectClick}
          />
          {
            selectChosenUser !== ''
            ? <UserCard selectChosenUser={selectChosenUser}/>
            : (<div className="empty-field"><i className="fab fa-github"></i></div>)
          }
          
        </main>
        <footer className="footer"></footer>
      </div>
    );
  }
}

export default App;
