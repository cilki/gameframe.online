
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

    totalCommits: PropTypes.number,
    totalIssues: PropTypes.number,

    fetchDescription: PropTypes.func.isRequired,
    fetchExplanation: PropTypes.func.isRequired,
    fetchContributors: PropTypes.func.isRequired,
    fetchIssues: PropTypes.func.isRequired,
  };

  static defaultProps = {
    contributors: [],
    description: '',
    explanation: '',

    totalCommits: 0,
    totalIssues: 0,
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
  }

  render() {
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
                <p><strong>Unit Tests: </strong>{0}</p>
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
                  For IGDB and Stream, we scraped data with a "GET" call on a range of ids.
                  While, News API and YouTube Data API's data got scraped with a "GET" call on specific keywords 
                  related to games. Furthermore, Twitter feeds are fetched by a plug-in that uses the name of 
                  a game as a keyword to get that game feed.
                </p>
              </Col>
            </Row>
            {/* Tools */}
            <Row>
              <h2><strong>Tools</strong></h2>
              <br />
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>AWS</h3>
                <p>Amazon Web Services (AWS) hosts our website.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://d33wubrfki0l68.cloudfront.net/f35d49d959deb5bfd7deb80c2668128367e2917c/eb35e/images/logo.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Babel</h3>
                <p>Babel converts our JSX into browser compatible JS.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/tools/docker_vertical.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Docker</h3>
                <p>Docker runs the development and production HTTP servers.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://i.lensdump.com/i/TDYNA.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Flask</h3>
                <p>Flask is a micro-framework for web applications written in Python.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/orgs%2Flogos%2Fgitbook%2FLogo.svg?alt=media&token=84da6255-53f6-443c-9ae6-de135cea8cee"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>GitBook</h3>
                <p>The site and its API are extensively documented with GitBook.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>GitHub</h3>
                <p>GitHub hosts the GameFrame source repository.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://cdn.worldvectorlogo.com/logos/namecheap.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Namecheap</h3>
                <p>Namecheap allowed us this cool domain name, gameframe.online.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>npm</h3>
                <p>npm is a JS node package manager.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://www.python.org/static/community_logos/python-logo-inkscape.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Python</h3>
                <p>Most of the backend is written in Python.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="data:image/png;base64,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"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>React-Bootstrap</h3>
                <p>
                  {'React-Bootstrap is a resource library for ReactJS that allowed us to mock up this website with' +
                    ' features like the carousel and navbar.'
                  }
                </p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://i.lensdump.com/i/TDuWM.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>React Router</h3>
                <p>
                  {'React Router is a resource library for ReactJS that allows' +
                    ' us to seemlessly load pages within our website.'
                  }
                </p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>ReactJS</h3>
                <p>ReactJS is our framework for JS based web application development.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/tools/slack_mark.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto'}}
                />
                <h3>Slack</h3>
                <p>Slack is where we communicate with each other.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/tools/smartdraw_logo.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>SmartDraw</h3>
                <p>SmartDraw is a tool we used to create a UML diagram.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://webpack.js.org/6bc5d8cf78d442a984e70195db059b69.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Webpack</h3>
                <p>Webpack manages our JS files into one package.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/tools/radium_logo.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Radium</h3>
                <p>Radium manages our inline styles and states on React elements.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>JavaScript</h3>
                <p>Most of the front-end is written in JavaScript.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMjUwIgogICBoZWlnaHQ9IjI1MCIKICAgaWQ9InN2ZzI4MzQiCiAgIHNvZGlwb2RpOnZlcnNpb249IjAuMzIiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuNDYiCiAgIHZlcnNpb249IjEuMCIKICAgc29kaXBvZGk6ZG9jbmFtZT0iU2VsZW5pdW0gTG9nbyBVcHJpZ2h0LnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMyODM2Ij4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50MzU5MyI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmY7c3RvcC1vcGFjaXR5OjE7IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIGlkPSJzdG9wMzU5NSIgLz4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2ZmZmZmZjtzdG9wLW9wYWNpdHk6MDsiCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgaWQ9InN0b3AzNTk3IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50MzU5MyIKICAgICAgIGlkPSJyYWRpYWxHcmFkaWVudDU1ODYiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMC41NzE2NzQ4LDAuNjIzMDE4NSwtMC42NjYzMzEsMC42MTE0MTc5LDM2MS42NDI5OCwtMjcxLjUzNjYzKSIKICAgICAgIGN4PSI1MzYuOTIxNjMiCiAgICAgICBjeT0iMjU3LjI5ODkyIgogICAgICAgZng9IjUzNi45MjE2MyIKICAgICAgIGZ5PSIyNTcuMjk4OTIiCiAgICAgICByPSIyMDEuMzc2ODkiIC8+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDM1NzEiPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMjY3NjFlO3N0b3Atb3BhY2l0eToxOyIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBpZD0ic3RvcDM1NzMiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiMyY2IxMzQ7c3RvcC1vcGFjaXR5OjAuOTk2MDc4NDM7IgogICAgICAgICBvZmZzZXQ9IjEiCiAgICAgICAgIGlkPSJzdG9wMzU3NSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDM1NzEiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ1NTg0IgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICB4MT0iNDk5Ljk4MjYiCiAgICAgICB5MT0iMzczLjk4Mjk3IgogICAgICAgeDI9IjYwMC45NDIyIgogICAgICAgeTI9IjE3NC44MTI4MiIgLz4KICAgIDxmaWx0ZXIKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIGlkPSJmaWx0ZXI0MTMxIgogICAgICAgeD0iLTAuMjc5NDA0MTYiCiAgICAgICB3aWR0aD0iMS41NTg4MDgzIgogICAgICAgeT0iLTAuMzE1NzU3NDUiCiAgICAgICBoZWlnaHQ9IjEuNjMxNTE0OSI+CiAgICAgIDxmZUdhdXNzaWFuQmx1cgogICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICAgIHN0ZERldmlhdGlvbj0iNDYuODg3OTUxIgogICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXI0MTMzIiAvPgogICAgPC9maWx0ZXI+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDMxNjAiPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojNGI0YjRiO3N0b3Atb3BhY2l0eToxOyIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBpZD0ic3RvcDMxNjIiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmY7c3RvcC1vcGFjaXR5OjE7IgogICAgICAgICBvZmZzZXQ9IjEiCiAgICAgICAgIGlkPSJzdG9wMzE2NCIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDMxNjAiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ1NTgyIgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDMuNDgwMDUwOCwwLDAsMy40ODAwNTA4LC0xNjQuNzIyMjksLTEyNC4yNjQ3NCkiCiAgICAgICB4MT0iMTYwLjc5NTM4IgogICAgICAgeTE9IjIyOS41NDkyNiIKICAgICAgIHgyPSIxNjAuNzk1MzgiCiAgICAgICB5Mj0iNjIuMTAwMjgxIiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQzNjA1Ij4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2ZmZmZmZjtzdG9wLW9wYWNpdHk6MTsiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgaWQ9InN0b3AzNjA3IiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTowOyIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBpZD0ic3RvcDM2MDkiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPHJhZGlhbEdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQzNjA1IgogICAgICAgaWQ9InJhZGlhbEdyYWRpZW50NTU4MCIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgzLjEzNjUzOCw0LjcwNDgwNykiCiAgICAgICBjeD0iMTUwLjU1MzgiCiAgICAgICBjeT0iMTYwLjY5ODQxIgogICAgICAgZng9IjE1MC41NTM4IgogICAgICAgZnk9IjE2MC42OTg0MSIKICAgICAgIHI9IjMxMi41OTA3NiIgLz4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50MzMwOCI+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wMzMxMCIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMjEyMTIxO3N0b3Atb3BhY2l0eToxOyIgLz4KICAgICAgPHN0b3AKICAgICAgICAgaWQ9InN0b3AzMzEyIgogICAgICAgICBvZmZzZXQ9IjEiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNiOGI4Yjg7c3RvcC1vcGFjaXR5OjE7IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50MzMwOCIKICAgICAgIGlkPSJyYWRpYWxHcmFkaWVudDU1NzgiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMTEuNjAwMTcsLTguOTE3NTk1ZS04LDcuMjMzMTZlLTgsOS40MDkwMjYyLC03NTcuODY3MzYsLTE1NDMuODI2NykiCiAgICAgICBjeD0iNzIuMDgwNjg4IgogICAgICAgY3k9IjIzNy4zMTE4IgogICAgICAgZng9IjcyLjA4MDY4OCIKICAgICAgIGZ5PSIyMzcuMzExOCIKICAgICAgIHI9Ijg5LjgyMzYyNCIgLz4KICAgIDxmaWx0ZXIKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIGlkPSJmaWx0ZXI1NTYwIgogICAgICAgeD0iLTAuMTAzMDYzNDQiCiAgICAgICB3aWR0aD0iMS4yMDYxMjY5IgogICAgICAgeT0iLTAuMzcyODE4NjUiCiAgICAgICBoZWlnaHQ9IjEuNzQ1NjM3MyI+CiAgICAgIDxmZUdhdXNzaWFuQmx1cgogICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICAgIHN0ZERldmlhdGlvbj0iMzMuMDI5MDUxIgogICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXI1NTYyIiAvPgogICAgPC9maWx0ZXI+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9Ijc0NC4wOTQ0OCA6IDUyNi4xODEwOSA6IDEiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzcyLjA0NzI0IDogMzUwLjc4NzM5IDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4NDIiIC8+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSIyLjE2IgogICAgIGlua3NjYXBlOmN4PSIxMjUiCiAgICAgaW5rc2NhcGU6Y3k9IjEyNSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNzUzIgogICAgIGlua3NjYXBlOndpbmRvdy14PSItNCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iODk2IiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTI4MzkiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxnCiAgICAgICBpZD0iZzU0MDQiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjI0ODk0ODksMS43NDQyMzUyZS0yLDAsMC4yNDg5NDg5LC00NDUuOTk1NzIsMzUuODU3OTc4KSI+CiAgICAgIDxnCiAgICAgICAgIGlkPSJnNTU2NiIKICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg1MC4wNjI1LC0yMDAuNjYwMjIpIj4KICAgICAgICA8cmVjdAogICAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk4NzQ1NiwtNS4wMDcyOTY4ZS0yLC0wLjQ2MDAwMDQsMC44ODc5MTg3LDAsMCkiCiAgICAgICAgICAgcng9IjExNS40MDE5MiIKICAgICAgICAgICByeT0iMzQuMjA1NDgyIgogICAgICAgICAgIHk9IjYyOS42MDgyMiIKICAgICAgICAgICB4PSI0MzcuNzQ4ODEiCiAgICAgICAgICAgaGVpZ2h0PSIyMDUuNjA1MDYiCiAgICAgICAgICAgd2lkdGg9IjYxOS4zMzE5MSIKICAgICAgICAgICBpZD0icmVjdDU0NDgiCiAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjE3LjQwMDI1MzM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7bWFya2VyLXN0YXJ0Om5vbmU7bWFya2VyLW1pZDpub25lO21hcmtlci1lbmQ6bm9uZTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7dmlzaWJpbGl0eTp2aXNpYmxlO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7ZmlsdGVyOnVybCgjZmlsdGVyNTU2MCk7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgLz4KICAgICAgICA8ZwogICAgICAgICAgIGlkPSJnNTQwNiIKICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLC0zLjg0NTIxOThlLTIsMCwxLC0zMy41MTc5OTcsMjUuNDEwMzgpIj4KICAgICAgICAgIDxyZWN0CiAgICAgICAgICAgICByeD0iMTE2LjQ5MTkiCiAgICAgICAgICAgICByeT0iMTA0LjAwODMyIgogICAgICAgICAgICAgeT0iNjMuODY0Njc3IgogICAgICAgICAgICAgeD0iNzguMjgwODE1IgogICAgICAgICAgICAgaGVpZ2h0PSI2MjUuMTgxNTIiCiAgICAgICAgICAgICB3aWR0aD0iNjI1LjE4MTUyIgogICAgICAgICAgICAgaWQ9InJlY3Q1NDA4IgogICAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOnVybCgjcmFkaWFsR3JhZGllbnQ1NTc4KTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzJiMmIyYjtzdHJva2Utd2lkdGg6MTcuNDAwMjUzMztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjttYXJrZXI6bm9uZTttYXJrZXItc3RhcnQ6bm9uZTttYXJrZXItbWlkOm5vbmU7bWFya2VyLWVuZDpub25lO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAvPgogICAgICAgICAgPHJlY3QKICAgICAgICAgICAgIHJ4PSIxMTQuOTIzNjMiCiAgICAgICAgICAgICByeT0iMTE0Ljk4NjIiCiAgICAgICAgICAgICB5PSI3MC44MDE4NTciCiAgICAgICAgICAgICB4PSI4NC4xODEyOTciCiAgICAgICAgICAgICBoZWlnaHQ9IjYxOC45MDg0NSIKICAgICAgICAgICAgIHdpZHRoPSI2MTguOTA4NTciCiAgICAgICAgICAgICBpZD0icmVjdDU0MTAiCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eTowLjU4NDk5OTk1O2ZpbGw6dXJsKCNyYWRpYWxHcmFkaWVudDU1ODApO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxNy40MDAyNTMzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO21hcmtlcjpub25lO21hcmtlci1zdGFydDpub25lO21hcmtlci1taWQ6bm9uZTttYXJrZXItZW5kOm5vbmU7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiIC8+CiAgICAgICAgICA8cmVjdAogICAgICAgICAgICAgcnk9IjExMS45MTUyMiIKICAgICAgICAgICAgIHk9IjkxLjg0NzM5NyIKICAgICAgICAgICAgIHg9Ijk3LjY5OTYxNSIKICAgICAgICAgICAgIGhlaWdodD0iNDMyLjczNjI3IgogICAgICAgICAgICAgd2lkdGg9IjU4NC4wNTMwNCIKICAgICAgICAgICAgIGlkPSJyZWN0NTQxMiIKICAgICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjAuODEwMDAwMDE7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50NTU4Mik7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7bWFya2VyLXN0YXJ0Om5vbmU7bWFya2VyLW1pZDpub25lO21hcmtlci1lbmQ6bm9uZTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7dmlzaWJpbGl0eTp2aXNpYmxlO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgLz4KICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY3NzY3Nzc3Nzc2Njc3Nzc2Nzc3NjY2NjY3Nzc2Njc3Nzc3NjY2NjY2NzY2MiCiAgICAgICAgICAgICBpZD0icGF0aDU0MTQiCiAgICAgICAgICAgICBkPSJNIDM0My45NTE2OSwzOTkuMTU2MTkgTCAyODYuNTU0NzEsNDE4LjM1ODg2IEMgMjc4LjgxNzIxLDM5NS41NjkxMSAyNjIuNDI4MTMsMzg0LjE3NDEzIDIzNy4zODc0NCwzODQuMTczODkgQyAyMTAuNjU4MzYsMzg0LjE3NDEzIDE5Ny4yOTM4OCwzOTIuODI1ODcgMTk3LjI5Mzk2LDQxMC4xMjkxNCBDIDE5Ny4yOTM4OCw0MTcuMDIyNjIgMTk5Ljc5MDkyLDQyMi44NjA3OCAyMDQuNzg1MTEsNDI3LjY0MzY3IEMgMjA5Ljc3OTEyLDQzMi40MjY5NCAyMjEuMDY4NTgsNDM2LjU3Njk2IDIzOC42NTM1NSw0NDAuMDkzNzUgQyAyNjguMDU1MjgsNDQ2LjAwMjQ0IDI4OS41NzkxMyw0NTEuOTgxMjggMzAzLjIyNTE2LDQ1OC4wMzAzIEMgMzE2Ljg3MDgxLDQ2NC4wNzk2NiAzMjguMzcxMjksNDczLjgyMTY2IDMzNy43MjY2NSw0ODcuMjU2MzQgQyAzNDcuMDgxNTcsNTAwLjY5MTMgMzUxLjc1OTE0LDUxNS43MDg3NSAzNTEuNzU5MzcsNTMyLjMwODc1IEMgMzUxLjc1OTE0LDU1OC4zMzQ0MSAzNDEuNzM1NzgsNTgwLjg0MzAxIDMyMS42ODkyNiw1OTkuODM0NjIgQyAzMDEuNjQyMzMsNjE4LjgyNjI3IDI3MS45MjM5NSw2MjguMzIyMDkgMjMyLjUzNDAyLDYyOC4zMjIwOSBDIDIwMi45OTEzNyw2MjguMzIyMDkgMTc3Ljg0NTA0LDYyMS42MDQ2OCAxNTcuMDk0OTcsNjA4LjE2OTg0IEMgMTM2LjM0NDgxLDU5NC43MzUwNCAxMjIuNjYzOCw1NzQuNzkzODMgMTE2LjA1MTksNTQ4LjM0NjE1IEwgMTc4LjUxMzMzLDUzNC4yMDc5MiBDIDE4NS41NDcyLDU2MS4wNzc2NSAyMDUuMTAxNTUsNTc0LjUxMjQ3IDIzNy4xNzY0Miw1NzQuNTEyNDIgQyAyNTIuNjUwOTYsNTc0LjUxMjQ3IDI2NC4xODY2Miw1NzEuNTIzMDUgMjcxLjc4MzQzLDU2NS41NDQxNCBDIDI3OS4zNzk5Miw1NTkuNTY1MzUgMjgzLjE3ODI1LDU1Mi40MjU5MSAyODMuMTc4NDIsNTQ0LjEyNTc4IEMgMjgzLjE3ODI1LDUzNS42ODUxNCAyNzkuNzMxNjIsNTI5LjE0MzU3IDI3Mi44Mzg1Miw1MjQuNTAxMDggQyAyNjUuOTQ1MSw1MTkuODU4NzggMjUyLjY1MDk2LDUxNS40OTc3NCAyMzIuOTU2MDYsNTExLjQxNzk0IEMgMTk2LjIzODc5LDUwMy44MjE0IDE3MC4wNzI1NCw0OTMuNDQ2MzQgMTU0LjQ1NzI0LDQ4MC4yOTI3NCBDIDEzOC44NDE4Niw0NjcuMTM5NDIgMTMxLjAzNDE5LDQ0Ny45MDE2IDEzMS4wMzQyLDQyMi41NzkyMyBDIDEzMS4wMzQxOSwzOTYuOTc1OSAxNDAuMzU0MTYsMzc1LjM4MTcxIDE1OC45OTQxMywzNTcuNzk2NiBDIDE3Ny42MzQwMiwzNDAuMjEyMDIgMjAyLjkyMTAzLDMzMS40MTk2IDIzNC44NTUyMiwzMzEuNDE5MzEgQyAyOTEuNDA3OTYsMzMxLjQxOTYgMzI3Ljc3MzQxLDM1My45OTg1NCAzNDMuOTUxNjksMzk5LjE1NjE5IEwgMzQzLjk1MTY5LDM5OS4xNTYxOSB6IE0gNTcwLjA5MDU1LDUyNy44NzczNyBMIDQzMi45Mjg2NCw1MjcuODc3MzcgQyA0MzIuNzg3ODgsNTMxLjY3NTc5IDQzMi43MTc1NCw1MzQuOTgxNzQgNDMyLjcxNzYyLDUzNy43OTUyMyBDIDQzMi43MTc1NCw1NTIuOTg4NjIgNDM2Ljc2MjA2LDU2NC40NTM5NCA0NDQuODUxMTgsNTcyLjE5MTIyIEMgNDUyLjk0MDExLDU3OS45Mjg2IDQ2Mi42MTE3Nyw1ODMuNzk3MjcgNDczLjg2NjIsNTgzLjc5NzIzIEMgNDk0LjgyNzIxLDU4My43OTcyNyA1MDcuNDE3OTUsNTcyLjYxMzMxIDUxMS42Mzg0OCw1NTAuMjQ1MzEgTCA1NjguNjEzNDIsNTU0LjQ2NTY4IEMgNTUyLjcxNjUxLDYwMy43MDMzMSA1MjAuNDMwNzQsNjI4LjMyMjA5IDQ3MS43NTYwMSw2MjguMzIyMDkgQyA0NTAuNTEzNCw2MjguMzIyMDkgNDMyLjQ3MTM1LDYyNC4wNjY1NiA0MTcuNjI5ODEsNjE1LjU1NTQ4IEMgNDAyLjc4ODE0LDYwNy4wNDQ0MyAzOTAuNTQ5MDksNTk0LjYyOTUzIDM4MC45MTI2Miw1NzguMzEwNzUgQyAzNzEuMjc2MSw1NjEuOTkyMDYgMzY2LjQ1Nzg1LDU0Mi40Mzc3MiAzNjYuNDU3ODcsNTE5LjY0NzY1IEMgMzY2LjQ1Nzg1LDQ4NS43NDQxOCAzNzYuMTI5NTIsNDU4LjM4MjE3IDM5NS40NzI4OSw0MzcuNTYxNTMgQyA0MTQuODE2MTcsNDE2Ljc0MTI2IDQzOS42ODExNCw0MDYuMzMxMDMgNDcwLjA2Nzg3LDQwNi4zMzA4MiBDIDQ5Ny41MDAxLDQwNi4zMzEwMyA1MjEuMDI4NjIsNDE2LjAwMjcgNTQwLjY1MzQ5LDQzNS4zNDU4MyBDIDU2MC4yNzc5OSw0NTQuNjg5MzUgNTcwLjA5MDMzLDQ4NS41MzMxNiA1NzAuMDkwNTUsNTI3Ljg3NzM3IEwgNTcwLjA5MDU1LDUyNy44NzczNyB6IE0gNDMyLjcxNzYyLDQ5MS4zNzEyIEwgNTA4LjQ3MzIsNDkxLjM3MTIgQyA1MDYuNTAzNTQsNDYyLjExMDE1IDQ5NC40NzU1MSw0NDcuNDc5NTYgNDcyLjM4OTA3LDQ0Ny40NzkzOSBDIDQ0OC43NTQ5Miw0NDcuNDc5NTYgNDM1LjUzMTEyLDQ2Mi4xMTAxNSA0MzIuNzE3NjIsNDkxLjM3MTIgTCA0MzIuNzE3NjIsNDkxLjM3MTIgeiIKICAgICAgICAgICAgIHN0eWxlPSJmb250LXNpemU6NDMyLjE2NTUyNzM0cHg7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDtmaWxsOiNlZWVlZWU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEwO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjAuNTg1MzY1NDU7Zm9udC1mYW1pbHk6RnJhbmtsaW4gR290aGljIERlbWk7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpGcmFua2xpbiBHb3RoaWMgRGVtaSIgLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcKICAgICAgICAgICBpZD0iZzU0MTYiCiAgICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLjEzNDY5MTgsMCwxLC0zOS45MTI4NjQsLTExNC4xOTQ1MikiPgogICAgICAgICAgPHBhdGgKICAgICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjYyIKICAgICAgICAgICAgIGlkPSJwYXRoNTQxOCIKICAgICAgICAgICAgIGQ9Ik0gMzc0LjIwNTM2LDMwMC41NTQwOCBMIDQ4OS42NjExNCw0MzMuMDc3MzggTCA3MzIuODQ1ODcsMTgwLjg2ODA0IEwgNjkzLjYzOTE1LDExMS44NjQyIEwgNDk5LjI5MDg3LDMxNy40MjkwMSBMIDQxOC4xMTY5LDI0Mi41MjgxMyBMIDM3NC4yMDUzNiwzMDAuNTU0MDggeiIKICAgICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxMDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxO2ZpbHRlcjp1cmwoI2ZpbHRlcjQxMzEpIiAvPgogICAgICAgICAgPHBhdGgKICAgICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjYyIKICAgICAgICAgICAgIGlkPSJwYXRoNTQyMCIKICAgICAgICAgICAgIGQ9Ik0gMzczLjUzOTM4LDMwNi45MzQ5MyBMIDQ5MS4xNTk1Niw0MzIuMzk2NDUgTCA3NzYuMjkzMTYsMTM3LjE3NDM3IEwgNzM3LjA4NjQ0LDY4LjE3MDUzMyBMIDQ5OS4wMDA5MSwzMTcuOTEyOCBMIDQxNy40NTA5MiwyNDEuMDY3NjMgTCAzNzMuNTM5MzgsMzA2LjkzNDkzIHoiCiAgICAgICAgICAgICBzdHlsZT0iZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50NTU4NCk7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEwO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjIgogICAgICAgICAgICAgaWQ9InBhdGg1NDIyIgogICAgICAgICAgICAgZD0iTSAzNzguMTMwNjEsMjk3LjIwMzE4IEwgNDk0LjE4MjUyLDM4MS40NDAzNCBMIDc2Ni41NzczOSwxMTcuOTA0NjEgTCA3MzkuMjkzMTcsNjcuOTc2Nzg0IEwgNDk5LjYzOTM3LDMyMi40MjM4NiBMIDQxOS42NTc2NSwyNDguNzE1MjMgTCAzNzguMTMwNjEsMjk3LjIwMzE4IHoiCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6dXJsKCNyYWRpYWxHcmFkaWVudDU1ODYpO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxMDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgICAgIDwvZz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg=="
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Selenium</h3>
                <p>Selenium tests our graphical user interface.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://camo.githubusercontent.com/af4bf83ab2ca125346740f9961345a24ec43b3a9/68747470733a2f2f636c6475702e636f6d2f78465646784f696f41552e737667"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Mocha</h3>
                <p>Mocha tests our JavaScript code.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="http://airbnb.io/img/projects/enzyme.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Enzyme</h3>
                <p>Enzyme makes testing our JavaScript code with Mocha easier.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://camo.githubusercontent.com/431283cc1643d02167aac31067137897507c60fc/687474703a2f2f636861696a732e636f6d2f696d672f636861692d6c6f676f2e706e67"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Chai</h3>
                <p>Chai makes assertions easier when testing our JavaScript code with Mocha.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://camo.githubusercontent.com/e69fbfc8dc529fda880b1890f43fa0aec6ab5cb6/687474703a2f2f65736c696e742e6f72672f696d672f6c6f676f2e737667"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Eslint</h3>
                <p>Eslint helps maintain our JavaScript code in a specific error-free format.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://cdn-images-1.medium.com/max/1600/0*HERF9Ii9f_M3OzQQ."
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Sinon</h3>
                <p>Sinon helps mock up data for testing our JavaScript code with Mocha.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://www.getpostman.com/img/v2/homepage/logo-ring.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Postman</h3>
                <p>We use Postman to document, develop, and test our API.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://pbs.twimg.com/profile_images/476392134489014273/q5uAkmy7_400x400.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>SQLAlchemy</h3>
                <p>SQLAlchemy is our Python SQL toolkit and Object Relational Mapper.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://upload.wikimedia.org/wikipedia/en/6/62/MySQL.svg"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>MySQL</h3>
                <p>MySQL manages our database.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/noImage.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>iso-3166-1</h3>
                <p>Country codes within website are parsed by iso-3166-1.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>React-Redux </h3>
                <p>React-Redux manages our state of data throughout the website.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/noImage.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>React-Twitter-Embed</h3>
                <p>React-Twitter-Embed is a resource library for Twitter plug-ins.</p>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Radium(AboutPage);
