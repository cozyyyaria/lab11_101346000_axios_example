import React, { Component } from 'react';
import axios from 'axios';

class PersonList extends Component {
  // Define state default values
  state = {
    persons: [],
    loading: true,
    error: null
  };

  // Component Lifecycle Callback
  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=10')
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons, loading: false });
      })
      .catch(err => {
        this.setState({ error: err.message, loading: false });
      });
  }
  


  render() {
    const { loading, error } = this.state;
    if (loading) return <p className="text-center mt-4">Loading users...</p>;
    if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

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