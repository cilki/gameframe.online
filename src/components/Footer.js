
/**
 * Component that lives on the bottom of the page in order
 * to display copyright information ...
 */


import React from 'react';
import { Panel } from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return (
      <div style={{
				textAlign: 'center',
			}}
      >
        <Panel.Footer style={{ background: '#272727', color: '#f9f9f9', position: 'relative', bottom: '0', width: '100%', borderTop: 'none', borderRadius: '0' }}>
				Copyright © 2018 GameFrame.Online. All rights reserved.
        </Panel.Footer>
      </div>
    );
  }
}

export default Footer;
