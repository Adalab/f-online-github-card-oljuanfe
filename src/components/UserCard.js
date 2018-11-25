import React, { Component } from 'react';
import moment from 'moment'
import '../styles/UserCard.css';
import { getUserInfo } from '../services/callAPI';

moment.locale('es', {
  relativeTime : {
    future : 'en %s',
    past : 'hace %s',
    s : 'segundos',
    m : 'un minuto',
    mm : '%d minutos',
    h : 'una hora',
    hh : '%d horas',
    d : 'un día',
    dd : '%d días',
    M : 'un mes',
    MM : '%d meses',
    y : 'un año',
    yy : '%d años'
},
})

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
    }
  }

  componentDidMount() {
    if(this.props.selectChosenUser !== '') {
      getUserInfo(this.props.selectChosenUser)
      .then(user => {
        this.setState({currentUser: user});
      });
    }
  }

  componentDidUpdate() {
    if(this.props.selectChosenUser !== '' && this.props.selectChosenUser !== this.state.currentUser.login) {
      getUserInfo(this.props.selectChosenUser)
      .then(user => {
        this.setState({currentUser: user});
      });
    }
  }

  render() {
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
    return (
      <div className="user-card-wrapper">
        <div 
          className="user-image" 
          style={{backgroundImage: `url(${avatar_url})` }}>
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
                  <i className="fas fa-map-marker-alt"></i>
                  {location}
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
          Miembro desde {moment(created_at).fromNow()}
        </span>
      </div>
    );
  }
}

export default UserCard;
