import React, { Component } from 'react';
import '../styles/UserCard.css';

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
      <div className="user-card-wrapper">
        <div className="user-image" style={{backgroundImage: `url(${avatar_url})` }}>
          {/* <img src={avatar_url} alt=""/> */}
        </div>
        <ul className="user-main-info">
          <li className="user-login">
            @{login}
          </li>
          <li>
            <h1 className="user-name">
              {name}
            </h1>
          </li>
          
          {
            !location
              ? ''
              : (<li className="user-location">
                  <i className="fas fa-map-marker-alt"></i>{location}
                </li>)
            }
        </ul>
        <ul className="user-secondary-info">
          <li className="user-repos secondary-info-item">
            <p className="sub-item-number">{public_repos}</p>
            <p className="sub-item-info">Repos</p>
          </li>
          <li className="user-followers secondary-info-item">
            <p className="sub-item-number">{followers}</p>
            <p className="sub-item-info">Followers</p>
          </li>
          <li className="user-following secondary-info-item">
            <p className="sub-item-number">{following}</p>
            <p className="sub-item-info">Following</p>
          </li>
        </ul>
        <span className="time-as-user">
          {created_at}
        </span>
      </div>
    );
  }
}

export default UserCard;
