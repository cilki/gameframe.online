
/**
 * Component that lives on the bottom of the page in order
 * to display copyright information ...
 */

import React from 'react';
import { Panel } from 'react-bootstrap';

/**
 * @description - Creates and returns a React component
 * used for the Footer of the webpage
 * @returns {React.Component}
 */
function Footer() {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Panel.Footer
        style={{
          background: '#272727',
          color: '#f9f9f9',
          position: 'relative',
          bottom: '0',
          width: '100%',
          borderTop: 'none',
          borderRadius: '0',
          boxShadow: 'inset 0 10px 20px -10px rgba(0,0,0,0.99), 0 6px 6px -6px rgba(0,0,0,0.23)'
        }}
      >
        Copyright © 2018 GameFrame.Online. All rights reserved.
      </Panel.Footer>
    </div>
  );
}

export default Footer;
