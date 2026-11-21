import React, { Component } from 'react';
import axios from 'axios';

class PersonList extends Component {
  // Define state default values
  state = {
    persons: []
  };

  // Component Lifecycle Callback
  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=10')
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      });
  }

  render() {
    return (
      <ul>
        {this.state.persons.map(person => (
          <li key={person.login.uuid}>
            {person.name.first} {person.name.last}
          </li>
        ))}
      </ul>
    );
  }
}

export default PersonList;