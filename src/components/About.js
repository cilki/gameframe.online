import React from 'react';

import {PageHeader, Grid, Row, Col, Image} from 'react-bootstrap'

class AboutPage extends React.Component {
    render() {

		return (
            <div style={{
                textAlign: 'center'
            }}>
                {/*Team Name*/}
                <PageHeader>GameFrame LLC </PageHeader>
                <br/>
                {/*Description and/or Explanation*/}
                <p>
                    This project was born out of all of our love of video games. TODO add stuff here. 
                </p>
                <br/>
                {/*Group Members*/}
                <Grid>
                    <Row>
                        <Col xs={12} md={4}>
                            <Image></Image>
                        </Col>
                        <Col xs={12} md={4}>
                            <Image></Image>
                        </Col>
                        <Col xs={12} md={4}>
                            <Image></Image>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
                            <Image></Image>
                        </Col>
                        <Col xs={12} md={4}>
                            <Image></Image>
                        </Col>
                        <Col xs={12} md={4}>
                            <Image></Image>
                        </Col>
                    </Row>
                </Grid>
                <br/>
                {/*Total Stats*/}
                <h3><strong>Team Stats</strong></h3>
                <p><strong>Commits: </strong></p>
                <p><strong>Issues: </strong></p>
                <p><strong>Unit Tests: </strong></p>
                {/*Data*/}
                {/*Tools*/}
                {/*GitBook*/}
                {/*GitHub*/}
            </div>
        );
    }
}

export default AboutPage;
