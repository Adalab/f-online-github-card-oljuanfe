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
    const { currentUser } = this.state;
    const {
      avatar_url,
      login,
      name,
      location,
      public_repos,
      followers,
      following,
      created_at,
    } = currentUser;
    console.log(selectChosenUser);
    console.log(currentUser.location, !currentUser.location)
    return (
      <div className="">
        <div className="user-image">
          <img src={avatar_url} alt=""/>
        </div>
        <div className="user-main-info">
          <span className="user-login">
            @{login}
          </span>
          <h1 className="user-name">
            {name}
          </h1>
          <div className="user-location">
            {location}
          </div>
        </div>
        <div className="user-secondary-info">
          <div className="user-repos">
            {public_repos} Repos
          </div>
          <div className="user-followers">
            {followers} Followers
          </div>
          <div className="user-following">
            {following} Following
          </div>
        </div>
        <span className="time-as-user">
          {created_at}
        </span>
      </div>
    );
  }
}

export default UserCard;
