
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
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/noImage.png"
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
                  src="../../../static/images/noImage.png"
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
                  src="../../../static/images/noImage.png"
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
                  src="../../../static/images/noImage.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>Postman</h3>
                <p>We use Postman to document, develop, and test our API.</p>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/noImage.png"
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                />
                <h3>SQLAlchemy</h3>
                <p>SQLAlchemy is our Python SQL toolkit and Object Relational Mapper.</p>
              </Col>
              <Col md={3} sm={3}>
                <Thumbnail
                  src="../../../static/images/noImage.png"
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
