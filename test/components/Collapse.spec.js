import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  mount,
} from 'enzyme';
import util from '../../src/util';
import Collapse from '../../src/components/Collapse';

describe('<Collapse />', () => {
  let requestAnimationFrameStub;
  let setExpandedSpy;
  let setContentStylePropertySpy;
  let componentDidMountSpy;
  let componentWillReceivePropsSpy;
  beforeEach(() => {
    requestAnimationFrameStub = sinon.stub(util, 'requestAnimationFrame');
    setExpandedSpy = sinon.spy(Collapse.prototype, 'setExpanded');
    setContentStylePropertySpy = sinon.spy(Collapse.prototype, 'setContentStyleProperty');
    componentDidMountSpy = sinon.spy(Collapse.prototype, 'componentDidMount');
    componentWillReceivePropsSpy = sinon.spy(Collapse.prototype, 'componentWillReceiveProps');
  });
  afterEach(() => {
    requestAnimationFrameStub.restore();
    setExpandedSpy.restore();
    setContentStylePropertySpy.restore();
    componentDidMountSpy.restore();
    componentWillReceivePropsSpy.restore();
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
    it('inner block should have height: 0px when open', () => {
      const wrapper = mount(<Collapse isOpen />);
      expect(wrapper.find('div').props().style.height,
    ).to.equal('0px');
    });
  });
  context('Component', () => {
    it('should not requestAnimationFrame when open', () => {
      mount(<Collapse isOpen><p>Content</p></Collapse>);
      sinon.assert.notCalled(requestAnimationFrameStub);
    });
    it('calls componentDidMount and setContentHeight with args auto', () => {
      mount(<Collapse isOpen />);
      sinon.assert.called(Collapse.prototype.componentDidMount);
      expect(Collapse.prototype.setExpanded.calledOnce).to.equal(true);
    });
    it('calls componentWillReceiveProps when opened and calls setContentHeight', () => {
      const wrapper = mount(<Collapse />);
      wrapper.setProps({ isOpen: true });
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      expect(Collapse.prototype.setContentStyleProperty.calledWith('height', '0px')).to.equal(true);
    });
    it('calls componentWillReceiveProps when collapsed and calls setContentHeight', () => {
      const wrapper = mount(<Collapse isOpen />);
      wrapper.setProps({ isOpen: false });
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      expect(Collapse.prototype.setContentStyleProperty.calledWith('height', '0px')).to.equal(true);
    });
    it('calls requestAnimationFrame when collapsed', () => {
      const wrapper = mount(
        <Collapse isOpen />,
      );
      wrapper.setProps({ isOpen: false });
      expect(requestAnimationFrameStub.called).to.equal(true);
    });
  });
});
