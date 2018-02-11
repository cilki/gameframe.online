import React from 'react';

import {PageHeader, Grid, Row, Col, Thumbnail} from 'react-bootstrap'

class AboutPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'cilki' : [0,0,0],
            'longhorn396': [0,0,0],
            'therealsamf': [0,0,0],
            'mitchellmarshe': [0,0,0],
            'atrieder': [0,0,0],
            'esoysal': [0,0,0],
            total: [0,0,0]
        };
        fetch('https://api.github.com/repos/cilki/gameframe.online/contributors', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                for(var i = 0; i < json.length; i++) {
                    this.state[json[i]['login']][0] = json[i]['contributions'];
                    this.state.total[0] += json[i]['contributions'];
                }
                this.setState(this.state);
            });
    }

    render() {

		return (
            <div style={{
                textAlign: 'center'
            }}>
                {/*Team Name*/}
                <PageHeader>GameFrame LLC </PageHeader>
                <hr/>
                {/*Description and/or Explanation*/}
                <p>
                    This project was born out of all of our love of video games. TODO add stuff here. 
                </p>
                <hr/>
                {/*Group Members*/}
                <Grid>
                    <Row>
                        <Col md={4}>
                            <Thumbnail src="https://avatars3.githubusercontent.com/u/10459406?s=460&v=4">
                                <h3>Tyler Cook</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> I&#39;m a 4th year CS/Math major with a passion for server technology, virtualization, and security.</p>
                                    <p><strong>Responsibilities:</strong> API design, server management, database design, backend programming.</p>
                                    <p><strong>Commits: </strong>{this.state['cilki'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['cilki'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['cilki'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4}>
                            <Thumbnail src="https://avatars0.githubusercontent.com/u/16629308?s=460&v=4">
                                <h3>Devin Drawhorn</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> </p>
                                    <p><strong>Responsibilities:</strong> </p>
                                    <p><strong>Commits: </strong>{this.state['longhorn396'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['longhorn396'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['longhorn396'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4}>
                            <Thumbnail src="https://avatars2.githubusercontent.com/u/11801943?s=460&v=4">
                                <h3>Sam Faulkner</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> </p>
                                    <p><strong>Responsibilities:</strong> </p>
                                    <p><strong>Commits: </strong>{this.state['therealsamf'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['therealsamf'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['therealsamf'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Thumbnail src="https://avatars3.githubusercontent.com/u/31491237?s=400&amp;u=62ece19c518a245346f2c939bde8e682654a8cd3&amp;v=4">
                                <h3>Mitchell Marshe</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> Born in Sparks, Nevada, on August 20, 1993. I moved to Austin, Texas with my family in 2005. 
									                         For most of my high school career, I focused on the studies of architecture. In 2012, I 
															 graduated from Stony Point High School and enrolled to Austin Community College where I 
															 obtained an Associate of General Education in Applied Sciences. Soon after, I enrolled to 
															 the University of Texas at Austin, where I am currently a Student of Computer Science, Software 
															 Engineering under Electrical Engineering, and Architectural History. Today, I work hard in my 
															 endeavors and I am well supported by my family, friends, and colleagues. I give much thanks to 
															 my loving wife, Kaidence, and our two cats, Socks & Buttercup for their love, encouragement, 
															 and understanding. </p>
                                    <p><strong>Responsibilities:</strong> Frontend Developer </p>
                                    <p><strong>Commits: </strong>{this.state['mitchellmarshe'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['mitchellmarshe'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['mitchellmarshe'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4}>
                            <Thumbnail src="https://avatars0.githubusercontent.com/u/21695410?s=460&v=4">
                                <h3>Andrew Rieder</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> </p>
                                    <p><strong>Responsibilities:</strong> </p>
                                    <p><strong>Commits: </strong>{this.state['atrieder'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['atrieder'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['atrieder'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4}>
                            <Thumbnail src="">
                                <h3>Ekin Soysal</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> </p>
                                    <p><strong>Responsibilities:</strong> </p>
                                    <p><strong>Commits: </strong>{this.state['esoysal'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['esoysal'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['esoysal'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
                <hr/>
                {/*Total Stats*/}
                <h3><strong>Team Stats</strong></h3>
                <p><strong>Commits: </strong>{this.state.total[0]}</p>
                <p><strong>Issues: </strong>{this.state.total[1]}</p>
                <p><strong>Unit Tests: </strong>{this.state.total[2]}</p>
                {/*Data*/}
                {/*Tools*/}
                {/*GitBook*/}
                {/*GitHub*/}
            </div>
        );
    }
}

export default AboutPage;
