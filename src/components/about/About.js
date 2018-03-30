/**
 * Main presenter component for the about page
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import Radium from 'radium';
import Styles from './AboutStyles';
import CommonAssets from '../../inline-styles/CommonAssets';
import GroupMember from '../group-member';

class AboutPage extends React.Component {
  static propTypes = {
    contributors: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    explanation: PropTypes.string,
    tools: PropTypes.arrayOf(PropTypes.shape({
      cover: PropTypes.string,
      name: PropTypes.string,
      phase: PropTypes.number,
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
    for (let toolCounter = 0; toolCounter * rowLength < this.props.tools.length; ++toolCounter) {
      toolRows.push(<Row key={`tool-row-${toolCounter}`}>
        {
            this.props.tools.slice(
              toolCounter * rowLength,
              toolCounter * rowLength + rowLength,
            ).map((tool) => {
              return (
                <Col
                  key={tool.name}
                  lg={3}
                  md={3}
                  sm={3}
                >
                  <div style={[Styles.cardPad]}>
                    <div style={[Styles.cardTool, Styles.cardExpand]} key={`${tool.name}-card`}>
                      <img src={tool.cover} style={[Styles.cardImage]}/>
                      <h3 style={[Styles.title]}>{tool.name}</h3>
                      <p style={[Styles.text]}><strong>Phase: </strong>{tool.phase}</p>
                      <p style={[Styles.text]}>{tool.usage}</p>
                    </div>
                  </div>
                </Col>
              );
            })
        }
      </Row>);
    }
    return toolRows;
  }

  render() {
    const tools = this.renderTools();
    const container = Styles.container;
    return (
      <div style={[Styles.main]}>
        <div style={[CommonAssets.fillBackground, CommonAssets.horizontalGradient]}/>
          <div style={[CommonAssets.stripeOverlay, CommonAssets.fillBackground]}/>
            <div style={[Styles.pad]}>
              <Jumbotron style={container}>
                <img
                  src="../../static/images/logo_black.svg"
                  alt="GameFrame.Online"
                  style={[Styles.brand]}
                />
      
                <p style={[Styles.text]}>{this.props.description}</p>
                <p style={[Styles.text]}>{this.props.explanation}</p>
                
                <div style={{padding: '0% 2% 0% 2%'}}>
                  <hr style={[Styles.hr]}/>
                </div>
                
                <div style={[Styles.grid]}>
                  <Grid>
                    <Row>
                      <h2 style={[Styles.title]}><strong>Group Members</strong></h2>
                    </Row>
                    <Row>
                      {this.props.contributors.map((contributor) => {
                        return (
                          <React.Fragment key={contributor}>
                            <GroupMember login={contributor}/>
                          </React.Fragment>
                        );
                      })}
                    </Row>
                    
                    <Row>
                      <div style={{padding: '0% 0% 2% 0%'}}>
                        <hr style={[Styles.hr]}/>
                      </div>
                    </Row>
                    
                    <Row>
                      <Col md={4} sm={4}>
                        <div style={[Styles.cardPad]}>
                          <div style={[Styles.cardInfo]}>
                            <h2 style={[Styles.title]}><strong>Team Stats</strong></h2>
                            <p style={[Styles.text]}><strong>Commits: </strong>{this.props.totalCommits}</p>
                            <p style={[Styles.text]}><strong>Issues: </strong>{this.props.totalIssues}</p>
                            <p style={[Styles.text]}><strong>Unit Tests: </strong>{this.props.totalUnitTests}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={4} sm={4}>
                        <div style={[Styles.cardPad]}>
                          <div style={[Styles.cardInfo]}>
                            <h2 style={[Styles.title]}><strong>Source and Documentation</strong></h2>
                            <a href="https://github.com/cilki/gameframe.online"><p style={[Styles.text]}>GitHub</p></a>
                            <a href="https://cilki.gitbooks.io/report/"><p style={[Styles.text]}>Technical Report</p></a>
                            <a href="https://cilki.gitbooks.io/api/"><p style={[Styles.text]}>API Documentation</p></a>
                          </div>
                        </div>
                      </Col>
                      <Col md={4} sm={4}>
                        <div style={[Styles.cardPad]}>
                          <div style={[Styles.cardInfo, Styles.cardExpand]}>
                            <h2 style={[Styles.title]}><strong>Data Sources</strong></h2>
                            <a href="https://www.igdb.com/api"><p style={[Styles.text]}>IGDB</p></a>
                            <a href="https://newsapi.org/"><p style={[Styles.text]}>News API</p></a>
                            <a href="https://developer.valvesoftware.com/wiki/Steam_Web_API"><p style={[Styles.text]}>Steam</p></a>
                            <a href="https://developer.twitter.com/en/docs"><p style={[Styles.text]}>Twitter</p></a>
                            <a href="https://developers.google.com/youtube/v3/docs/"><p style={[Styles.text]}>YouTube Data API</p></a>
                            <p style={[Styles.text]}>
                              {
                                'For IGDB and Stream, we scraped data with a "GET" call on a range of ids. ' +
                                'While, News API and YouTube Data API\'s data got scraped with a "GET" call ' +
                                'on specific keywords related to games. Furthermore, Twitter feeds are fetched ' +
                                ' by a plug-in that uses the name of a game as a keyword to get that game feed.'
                              }
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    
                    <Row>
                      <hr style={[Styles.hr]}/>
                    </Row>
                    
                    <Row>
                      <h2 style={[Styles.title]}><strong>Tools</strong></h2>
                    </Row>
                    {tools}
                  </Grid>
                </div>
              </Jumbotron>
        </div>
      </div>
    );
  }
}

export default Radium(AboutPage);
