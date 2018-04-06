import React from 'react';
import Radium from 'radium';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import { browserHistory, withRouter } from 'react-router';//eslint-disable-line

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(eventKey) {
    this.setState({ input: eventKey.target.value });
  }

  handleSubmit = (eventKey) => {
    eventKey.preventDefault();
    this.props.history.push("/search?q=" + escape(this.state.input));//eslint-disable-line
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicText">
            <FormControl type="text" value={this.state.input} placeholder="Search" onChange={this.handleChange} />
            <Button onClick={this.handleSubmit}>
              Search
            </Button>
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default withRouter(Radium(Search));
