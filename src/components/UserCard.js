import React, { Component } from 'react';
// import './UserCard.css';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    if(this.props.selectChosenUser !== '') {
      this.getUserInfo();
    }
  }

  componentDidUpdate() {
    if(this.props.selectChosenUser !== '' && this.props.selectChosenUser !== this.state.currentUser.login) {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    fetch(`https://api.github.com/users/${this.props.selectChosenUser}`)
    .then(response =>  response.json())
    .then(json => {
      console.log('json', json);
      this.setState({
        currentUser: json
      });
    });
  }

  render() {
    console.log('props card', this.props);
    console.log('state card', this.state);
    const { 
      selectChosenUser
    } = this.props;
    console.log(selectChosenUser);
    return (
      <div className="">
        
      </div>
    );
  }
}

export default UserCard;
