
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
                <p><a href="https://developer.valvesoftware.com/wiki/Steam_Web_API">Steam</a></p>
                <p><a href="https://www.igdb.com/api">IGDB</a></p>
                <p><a href="https://www.giantbomb.com/api/">Giant Bomb</a></p>
                <p><a href="https://developer.twitter.com/en/docs">Twitter</a></p>
                <p>Each data source was manually collected for this phase of the project.</p>
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
                  src="https://a0.awsstatic.com/main/images/logos/aws_logo_smile_1200x630.png"
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
                  src="https://i1.wp.com/blog.docker.com/wp-content/uploads/2013/06/Docker-logo-011.png?ssl=1"
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
                  src="http://cdn.gbraad.nl/images/portfolio/gitbook-logo.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>GitBook</h3>
                <p>The site and its API are extensively documented with GitBook.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://i.lensdump.com/i/TD3gC.md.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>GitHub</h3>
                <p>GitHub hosts the GameFrame source repository.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://i.lensdump.com/i/TD7WT.md.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Namecheap</h3>
                <p>Namecheap allowed us this cool domain name, gameframe.online.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/640px-Npm-logo.svg.png"
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
                  src="https://tse1.mm.bing.net/th?id=OIP.PhCTTNKigiR-TKmKdXCSUAHaHB&w=136&h=129&c=7&o=5&dpr=1.1&pid=1.7"
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
                  src="https://i.lensdump.com/i/TDeH3.md.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>ReactJS</h3>
                <p>ReactJS is our framework for JS based web application development.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://i.lensdump.com/i/TDLgD.md.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Slack</h3>
                <p>Slack is where we communicate with each other.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://wcs.smartdraw.com/common/img/smardraw-logo.png?bn=1510011106"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>SmartDraw</h3>
                <p>SmartDraw is a tool we used to create a UML diagram.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="https://tse4.mm.bing.net/th?id=OIP.gFZhldMJQCiCQylrx6oU2AHaFG&w=222&h=160&c=7&o=5&dpr=1.1&pid=1.7"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Webpack</h3>
                <p>Webpack manages our JS files into one package.</p>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Radium(AboutPage);
