
/**
 * Unit test script for About.js
 */

import React from 'react'; // this is needed because we're creating React components
import { assert } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import About from '../../src/components/About';

describe('<About />', function() {
  it('Calls `fetch()` for the Github contributors when constructed', function() {
    let fetchStub;

    try { // because window isn't defined in a Node environment (Mocha)
      fetchStub = sinon.stub(window, 'fetch');
    }
    catch (err) {
      fetchStub = sinon.stub();
      global.fetch = fetchStub;
    }

    // Configure the stub to return a promise, because that's what `fetch()` returns
    fetchStub.returns(Promise.resolve().catch(() => {}));

    const wrapper = shallow(<About />);
    assert(fetchStub.called, '`fetch()` was never called');
    assert.include(fetchStub.getCall(0).args[0], 'contributors', '`fetch()` didn\'t include \'contributors\' in its first argument');
  });
});