import React, { Component } from 'react';
import '../styles/AllUsersSelect.css';

class AllUsersSelect extends Component {
  render() {
    const { 
      adalabUsers,
      handleSelectClick,
    } = this.props;
    return (
      <div className="select-wrapper">
        <select 
          name="adalab-users" 
          id="adalab-users"  
          className="select-users" 
          onClick={handleSelectClick}
        >
          <option value="">Seleccione un usuario</option>
          {
            adalabUsers.map(user => {
              return (
                <option value={user.userName} key={user.id}>
                  {user.userName}
                </option>
              );
            })
          }
        
        </select>
        
      </div>
    );
  }
}

export default AllUsersSelect;
