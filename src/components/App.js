import React, { Component } from 'react';
import AllUsersSelect from './AllUsersSelect';
import UserCard from './UserCard';
import { getAdalabers } from '../services/callAPI';  
import '../styles/App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      adalabUsers: [],
      selectChosenUser: '', 
    }
    this.handleSelectClick = this.handleSelectClick.bind(this);
  }

  componentDidMount() {
    getAdalabers()
    .then(users => {
      this.setState({adalabUsers: users.map(item => ({userName: item.login, id: item.id}))});
    });
  }


  handleSelectClick(event) {
    this.setState({selectChosenUser: event.currentTarget.value });
  }

  render() {
    const {
      adalabUsers,
      selectChosenUser,
    } = this.state;
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
