import React, { Component } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';

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
    const { persons, loading, error } = this.state;
    if (loading) return <p className="text-center mt-4">Loading users...</p>;
    if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

    return (
      <div className="px-3">
        {persons.map(person => {
          const id = person.login.uuid;
          const { street, city, state, country, postcode } = person.location;

          return (
            <Card key={id} className="person-card my-3">
              <Card.Header className="fw-bold">
                {person.name.title} {person.name.first} {person.name.last} - {id}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={2} className="text-center">
                    <Image src={person.picture.large} roundedCircle className="person-img mb-3" alt="" />
                    <div>
                      <Button variant="primary" size="sm">Details</Button>
                    </div>
                  </Col>
                  <Col md={10}>
                    <Detail label="User Name" value={<span className="fs-5">{person.login.username}</span>} />
                    <Detail label="Gender" value={person.gender.toUpperCase()} />
                    <Detail label="Time Zone Description" value={person.location.timezone.description} />
                    <Detail label="Address" value={`${street.number} ${street.name}, ${city}, ${state}, ${country} - ${postcode}`} />
                    <Detail label="Email" value={person.email} />
                    <Detail label="Birth Date and Age" value={`${person.dob.date} (${person.dob.age})`} />
                    <Detail label="Register Date" value={person.registered.date} />
                    <Detail label="Phone#" value={person.phone} />
                    <Detail label="Cell#" value={person.cell} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

// One label/value row
function Detail({ label, value }) {
  return (
    <Row className="mb-2">
      <Col sm={3} className="text-end">{label}:</Col>
      <Col sm={9}>{value}</Col>
    </Row>
  );
}

export default PersonList;