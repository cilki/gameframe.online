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
      <div style={{
        filter: 'hue-rotate(170deg) invert(90%) saturate(300%) brightness(90%) grayscale(25%)',
      }}
      >
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicText">
            <FormControl type="text" value={this.state.input} placeholder="Search" onChange={this.handleChange} style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
            <Button onClick={this.handleSubmit} style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', borderLeft: 'none' }}>
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
