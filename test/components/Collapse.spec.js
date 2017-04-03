import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  mount,
} from 'enzyme';
import util from '../../src/util';
import Collapse from '../../src/components/collapse';

describe('<Collapse />', () => {
  let requestAnimationFrameStub;
  beforeEach(() => {
    requestAnimationFrameStub = sinon.stub(util, 'requestAnimationFrame');
  });
  afterEach(() => {
    requestAnimationFrameStub.restore();
  });
  context('DOM element', () => {
    it('should include className when defined', () => {
      const className = 'collapse';
      expect(
        mount(<Collapse className={className} />).prop('className'),
      ).to.equal(className);
    });
    it('inner block should have height: 0px when collapsed', () => {
      expect(
        mount(<Collapse />).find('div').props().style.height,
      ).to.equal('0px');
    });
  });
  context('Component', () => {
    it('should requestAnimationFrame when open', () => {
      mount(<Collapse isOpen><p>Content</p></Collapse>);
      sinon.assert.calledOnce(requestAnimationFrameStub);
    });
    it('should not requestAnimationFrame when collapsed', () => {
      mount(<Collapse><p>Content</p></Collapse>);
      sinon.assert.notCalled(requestAnimationFrameStub);
    });
  });
});
