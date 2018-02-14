import React from 'react';

import {PageHeader, Grid, Row, Col, Thumbnail, Image} from 'react-bootstrap'

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
        fetch('https://api.github.com/repos/cilki/gameframe.online/issues', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                for(var i = 0; i < json.length; i++){
                    this.state[json[i]['user']['login']][1] += 1;
                    this.state.total[1] += 1;
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
                <h1>GameFrame LLC </h1>
                <div style={{
                    width: '75%',
                    marginLeft: '12.5%'
                }}>
                    {/*Description*/}
                    <p>
                        This project was born out of all of our love of video games. It connects games to their developers and news articles to both games and developers. 
						The purpose is to get as much data as possible about a game in the same place. We hope the site will be used by others like us with the same love of 
						gaming and thirst for knowledge.
                    </p>
                    {/*Explanation*/}
                    <p>
                        By choosing these three models, we will eventually (in later phases) be able to connect news articles about video games to articles about similar games 
						by the tags and genres about the games as well as games made by the same developer. This will facilitate the learning and appreciation of new or lesser 
						known games. 
                    </p>
                </div>
                <hr/>
                {/*Group Members*/}
                <Grid>
                    <Row>
                        <h2><strong>Group Members</strong></h2>
                    </Row>
                    <Row>
                        <Col md={4} sm={4}>
                            <Thumbnail src="https://avatars3.githubusercontent.com/u/10459406?s=460&v=4">
                                <h3>Tyler Cook</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> I&#39;m a 4th year CS/Math major with a passion for server technology, virtualization, and security. </p>
                                    <p><strong>Responsibilities:</strong> Phase 1 Manager & Backend Developer </p>
                                    <p><strong>Commits: </strong>{this.state['cilki'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['cilki'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['cilki'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4} sm={4}>
                            <Thumbnail src="https://avatars0.githubusercontent.com/u/16629308?s=460&v=4">
                                <h3>Devin Drawhorn</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> I'm a 3rd year CS student with experience in Java and web development. </p>
                                    <p><strong>Responsibilities:</strong> Frontend Developer </p>
                                    <p><strong>Commits: </strong>{this.state['longhorn396'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['longhorn396'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['longhorn396'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4} sm={4}>
                            <Thumbnail src="https://avatars2.githubusercontent.com/u/11801943?s=460&v=4">
                                <h3>Sam Faulkner</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> I'm from Fort Worth, Texas and a 3rd year math/CS student. </p>
                                    <p><strong>Responsibilities:</strong> Frontend Developer </p>
                                    <p><strong>Commits: </strong>{this.state['therealsamf'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['therealsamf'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['therealsamf'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} sm={4}>
                            <Thumbnail src="https://avatars0.githubusercontent.com/u/31491237?s=460&v=4">
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
															 my loving wife, Kaidence, and our two cats, Socks &amp; Buttercup for their love, encouragement, 
															 and understanding. </p>
                                    <p><strong>Responsibilities:</strong> Frontend Developer </p>
                                    <p><strong>Commits: </strong>{this.state['mitchellmarshe'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['mitchellmarshe'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['mitchellmarshe'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4} sm={4}>
                            <Thumbnail src="https://avatars0.githubusercontent.com/u/21695410?s=460&v=4">
                                <h3>Andrew Rieder</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> I am a student studying Computer Science at the University of Texas at Austin with particular interest in systems & architecture 
									                         and high performance computing. </p>
                                    <p><strong>Responsibilities:</strong> Frontend Developer </p>
                                    <p><strong>Commits: </strong>{this.state['atrieder'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['atrieder'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['atrieder'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                        <Col md={4} sm={4}>
                            <Thumbnail src="https://avatars3.githubusercontent.com/u/16373610?s=460&v=4">
                                <h3>Ekin Soysal</h3>
                                <div style={{
                                    textAlign: 'left'
                                }}>
                                    <p><strong>Bio:</strong> I was born in Ankara, Turkey, on October 19th, 1997. I moved to Houston, Texas in 2013, and graduated from William 
									                         P. Clements High School in 2015. I enrolled into University of Texas at San Antonio after graduating from high school 
															 and transferred into University of Texas at Austin one year later, where I am currently pursuing a Bachelor of Science 
															 degree in Computer Science and a Certificate in Applied Statistical Modeling. </p>
                                    <p><strong>Responsibilities:</strong> Backend Developer </p>
                                    <p><strong>Commits: </strong>{this.state['esoysal'][0]}</p>
                                    <p><strong>Issues: </strong>{this.state['esoysal'][1]}</p>
                                    <p><strong>Unit Tests: </strong>{this.state['esoysal'][2]}</p>
                                </div>
                            </Thumbnail>
                        </Col>
                    </Row>
                    <Row>
                        <hr/>
                    </Row>
                    <Row>
                        {/*Total Stats*/}
                        <Col md={4} sm={4}>
                            <h2><strong>Team Stats</strong></h2>
                            <p><strong>Commits: </strong>{this.state.total[0]}</p>
                            <p><strong>Issues: </strong>{this.state.total[1]}</p>
                            <p><strong>Unit Tests: </strong>{this.state.total[2]}</p>
                        </Col>
                        {/*GitHub and GitBook*/}
                        <Col md={4} sm={4}>
                            <h2><strong>Source and Documentation</strong></h2>
                            <a href="https://github.com/cilki/gameframe.online"><p>GitHub</p></a>
                            <a href="https://www.gitbook.com/book/cilki/report/details"><p>Technical Report</p></a>
                            <a href="https://cilki.gitbooks.io/api/"><p>API Documentation</p></a>
                        </Col>
                        {/*Data*/}
                        <Col md={4} sm={4}>
                            <h2><strong>Data Sources</strong></h2>
                            <p><a href='https://developer.valvesoftware.com/wiki/Steam_Web_API'>Steam Web API</a></p>
                            <p><a href='https://www.igdb.com/api'>IGDB</a></p>
                            <p><a href='https://www.giantbomb.com/api/'>Giant Bomb</a></p>
                            <p><a href='https://developer.twitter.com/en/docs'>Twitter</a></p>
                            <p>Each data source was manually scraped for this phase of the project.</p>
                        </Col>
                    </Row>
                    {/*Tools*/}
                    <Row>
                        <h2><strong>Tools</strong></h2>
                        <br/>
                    </Row>
                    <Row>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://a0.awsstatic.com/main/images/logos/aws_logo_smile_1200x630.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>AWS</h3>
                            <p>Amazon Web Services (AWS) hosts our website.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://d33wubrfki0l68.cloudfront.net/f35d49d959deb5bfd7deb80c2668128367e2917c/eb35e/images/logo.svg" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>Babel</h3>
                            <p>Babel converts our JSX into browser compatible JS.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://i1.wp.com/blog.docker.com/wp-content/uploads/2013/06/Docker-logo-011.png?ssl=1" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>Docker</h3>
                            <p>Docker runs our frontend development container.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://i.lensdump.com/i/TDYNA.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>Flask</h3>
                            <p>Flask is our framework for Python based web application development.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} sm={3}>
                            <Thumbnail src="http://cdn.gbraad.nl/images/portfolio/gitbook-logo.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>GitBook</h3>
                            <p>GitBook is where we document our website development.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://i.lensdump.com/i/TD3gC.md.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>GitHub</h3>
                            <p>GitHub is where we collaborate on code.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://i.lensdump.com/i/TD7WT.md.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>Namecheap</h3>
                            <p>Namecheap allowed us this cool domain name, gameframe.online.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/640px-Npm-logo.svg.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>npm</h3>
                            <p>npm is our JS node package manager.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://www.python.org/static/community_logos/python-logo-inkscape.svg" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>Python</h3>
                            <p>Python is a language we use.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://tse1.mm.bing.net/th?id=OIP.PhCTTNKigiR-TKmKdXCSUAHaHB&w=136&h=129&c=7&o=5&dpr=1.1&pid=1.7" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>React-Bootstrap</h3>
                            <p>React-Bootstrap is a resource library for ReactJS that allowed us to mock up this website with features like the carousel and navbar.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://i.lensdump.com/i/TDuWM.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>React Router</h3>
                            <p>React Router is a resource library for ReactJS that allows us to seemlessly load pages within our website.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://i.lensdump.com/i/TDeH3.md.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>ReactJS</h3>
                            <p>ReactJS is our framework for JS based web application development.</p>
                        </Col>
                    </Row>
					<Row>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://i.lensdump.com/i/TDLgD.md.png" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>Slack</h3>
                            <p>Slack is where we communicate to each other.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://wcs.smartdraw.com/common/img/smardraw-logo.png?bn=1510011106" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>SmartDraw</h3>
                            <p>SmartDraw is a tool we used to create a UML diagram.</p>
                        </Col>
                        <Col md={3} sm={3}>
                            <Thumbnail src="https://tse4.mm.bing.net/th?id=OIP.gFZhldMJQCiCQylrx6oU2AHaFG&w=222&h=160&c=7&o=5&dpr=1.1&pid=1.7" style={{width:'150px',height:'150px',margin:'auto'}}/>
                            <h3>Webpack</h3>
                            <p>Webpack manages our JS files into one package.</p>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default AboutPage;
