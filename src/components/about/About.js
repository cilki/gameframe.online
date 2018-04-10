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
import ReactHTMLParser from 'react-html-parser';

class AboutPage extends React.Component {
  static propTypes = {
    contributors: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
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
    fetchContributors: PropTypes.func.isRequired,
    fetchIssues: PropTypes.func.isRequired,
    fetchTools: PropTypes.func.isRequired,
  };

  static defaultProps = {
    contributors: [],
    description: '',
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
                  <div style={[Styles.cardPad]}>
                    <div style={[Styles.cardTool]}>
                      <img src={tool.cover} style={[Styles.cardToolImage]}/>
                      <h3 style={[Styles.cardToolTitle]}>{tool.name}</h3>
                      <p style={[Styles.cardToolParagraph]}>{tool.usage}</p>
                    </div>
                  </div>
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
    const container = Styles.container;
    return (
      <div style={[Styles.main]}>
        <div style={[CommonAssets.fillBackground, CommonAssets.horizontalGradient]}/>
          <div style={[CommonAssets.stripeOverlay, CommonAssets.fillBackground]}/>
            <div style={[Styles.pad]}>
              <Jumbotron style={container}>
                <h2 style={[Styles.title]}><strong>What's This Database</strong></h2>
                <p style={[Styles.paragraph]}>{ReactHTMLParser(this.props.description)}</p>

                <div style={{padding: '0% 2% 0% 2%'}}>
                  <hr style={[Styles.hr]}/>
                </div>

                <div style={[Styles.grid]}>
                  <Grid>
                    <Row>
                      <h2 style={[Styles.title]}><strong>The GameFrame Team</strong></h2>
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
                            <p style={[Styles.stats]}>{this.props.totalCommits} Commits</p>
                            <div><hr style={[Styles.statsHr]}/></div>
                            <p style={[Styles.stats]}>{this.props.totalIssues} Issues</p>
                            <div><hr style={[Styles.statsHr]}/></div>
                            <p style={[Styles.stats]}>{this.props.totalUnitTests} Tests</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={4} sm={4}>
                        <div style={[Styles.cardPad]}>
                          <div style={[Styles.cardInfo]}>
                            <h2 style={[Styles.title]}><strong>Documentation</strong></h2>
                            <a href="https://github.com/cilki/gameframe.online"><p style={[Styles.label]} key={"label-1"}>GitHub</p></a>
                            <a href="https://cilki.gitbooks.io/report/"><p style={[Styles.label]} key={"label-2"}>Technical Report</p></a>
                            <a href="https://cilki.gitbooks.io/api/"><p style={[Styles.label]} key={"label-3"}>API Documentation</p></a>
                          </div>
                        </div>
                      </Col>
                      <Col md={4} sm={4}>
                        <div style={[Styles.cardPad]}>
                          <div style={[Styles.cardInfo]}>
                            <h2 style={[Styles.title]}><strong>Data Sources</strong></h2>
                            <a href="https://www.igdb.com/api"><p style={[Styles.label]} key={"label-4"}>IGDB</p></a>
                            <a href="https://newsapi.org/"><p style={[Styles.label]} key={"label-5"}>News API</p></a>
                            <a href="https://developer.valvesoftware.com/wiki/Steam_Web_API"><p style={[Styles.label]} key={"label-6"}>Steam</p></a>
                            <a href="https://developer.twitter.com/en/docs"><p style={[Styles.label]} key={"label-7"}>Twitter</p></a>
                            <a href="https://developers.google.com/youtube/v3/docs/"><p style={[Styles.label]} key={"label-8"}>YouTube Data API</p></a>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <hr style={[Styles.hr]}/>
                    </Row>

                    <Row>
                      <h2 style={[Styles.title]}><strong>Tools of the Trade</strong></h2>
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
