
/**
 * Main presenter component for the about page
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import Radium from 'radium';

import Styles from './AboutStyles';
import GroupMember from '../group-member';

class AboutPage extends React.Component {
  static propTypes = {
    contributors: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    explanation: PropTypes.string,
    tools: PropTypes.arrayOf(PropTypes.shape({
      cover: PropTypes.string,
      name: PropTypes.string,
      usage: PropTypes.string,
    })),

    totalCommits: PropTypes.number,
    totalIssues: PropTypes.number,
    totalUnitTests: PropTypes.number,

    fetchDescription: PropTypes.func.isRequired,
    fetchExplanation: PropTypes.func.isRequired,
    fetchContributors: PropTypes.func.isRequired,
    fetchIssues: PropTypes.func.isRequired,
    fetchTools: PropTypes.func.isRequired,
  };

  static defaultProps = {
    contributors: [],
    description: '',
    explanation: '',
    tools: [],

    totalCommits: 0,
    totalIssues: 0,
    totalUnitTests: 0,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch the data
   */
  componentDidMount() {
    this.props.fetchDescription();
    this.props.fetchExplanation();
    this.props.fetchContributors();
    this.props.fetchIssues();
    this.props.fetchTools();
  }

  /**
   * @description - Helper method for rendering the tools
   * @returns {Array}
   */
  renderTools() {
    const toolRows = [];
    const rowLength = 4;
    for (let toolCounter = 0; toolCounter * rowLength < this.props.tools.length; ++toolCounter) { //eslint-disable-line
      toolRows.push( //eslint-disable-line
        <Row key={`tool-row-${toolCounter}`}>
          {
            this.props.tools.slice(
              toolCounter * rowLength,
              toolCounter * rowLength + rowLength, //eslint-disable-line
            ).map((tool) => {
              return (
                <Col
                  key={tool.name}
                  lg={3}
                  md={3}
                  sm={3}
                >
                  <Thumbnail
                    src={tool.cover}
                    style={{ width: '150px', height: '150px', margin: 'auto' }}
                  />
                  <h3>{tool.name}</h3>
                  <p>{tool.usage}</p>
                </Col>
              );
            })
          }
        </Row>,
      ); //eslint-disable-line
    }

    return toolRows;
  }

  render() {
    const tools = this.renderTools();

    return (
      <div style={[Styles.container]}>
        {/* Team Name */}
        <h1>GameFrame LLC </h1>
        <div style={[Styles.text]}>
          {/* Description */}
          <p>{this.props.description}</p>
          {/* Explanation */}
          <p>{this.props.explanation}</p>
        </div>
        <hr />
        {/* Group Members */}
        <div style={[Styles.grid]}>
          <Grid>
            <Row>
              <h2><strong>Group Members</strong></h2>
            </Row>
            <Row>
              {this.props.contributors.map((contributor) => {
                return (
                  <React.Fragment
                    key={contributor}
                  >
                    <GroupMember
                      login={contributor}
                    />
                  </React.Fragment>
                );
              })}
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              {/* Total Stats */}
              <Col md={4} sm={4}>
                <h2><strong>Team Stats</strong></h2>
                <p><strong>Commits: </strong>{this.props.totalCommits}</p>
                <p><strong>Issues: </strong>{this.props.totalIssues}</p>
                <p><strong>Unit Tests: </strong>{this.props.totalUnitTests}</p>
              </Col>
              {/* GitHub and GitBook */}
              <Col md={4} sm={4}>
                <h2><strong>Source and Documentation</strong></h2>
                <a href="https://github.com/cilki/gameframe.online"><p>GitHub</p></a>
                <a href="https://cilki.gitbooks.io/report/"><p>Technical Report</p></a>
                <a href="https://cilki.gitbooks.io/api/"><p>API Documentation</p></a>
              </Col>
              {/* Data */}
              <Col md={4} sm={4}>
                <h2><strong>Data Sources</strong></h2>
                <p><a href="https://www.igdb.com/api">IGDB</a></p>
                <p><a href="https://newsapi.org/">News API</a></p>
                <p><a href="https://developer.valvesoftware.com/wiki/Steam_Web_API">Steam</a></p>
                <p><a href="https://developer.twitter.com/en/docs">Twitter</a></p>
                <p><a href="https://developers.google.com/youtube/v3/docs/">YouTube Data API</a></p>
                <p>
                  {
                    'For IGDB and Stream, we scraped data with a "GET" call on a range of ids. ' +
                    'While, News API and YouTube Data API\'s data got scraped with a "GET" call ' +
                    'on specific keywords related to games. Furthermore, Twitter feeds are fetched ' +
                    ' by a plug-in that uses the name of a game as a keyword to get that game feed.'
                  }
                </p>
              </Col>
            </Row>
            {/* Tools */}
            <Row>
              <h2><strong>Tools</strong></h2>
              <br />
            </Row>
            {
              tools
            }
          </Grid>
        </div>
      </div>
    );
  }
}

export default Radium(AboutPage);
