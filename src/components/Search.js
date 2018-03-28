import React from 'react';
import { FormControl, FormGroup, Button, Glyphicon } from 'react-bootstrap';
import { browserHistory, withRouter } from 'react-router';//eslint-disable-line
import NavbarStyles from '../inline-styles/NavbarStyles';

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
    this.props.history.push("/search?q=" + this.state.input);//eslint-disable-line
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicText">
            <FormControl type="text" value={this.state.input} placeholder="Search" onChange={this.handleChange} />
            <Button style={[NavbarStyles.button]} onClick={this.handleSubmit}>
              <Glyphicon glyph="search" />
            </Button>
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default withRouter(Search);
