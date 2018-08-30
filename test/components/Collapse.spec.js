import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import util from '../../src/util';
import Collapse from '../../src/components/Collapse';

describe('<Collapse />', () => {
  let requestAnimationFrameStub;
  let setExpandedSpy;
  let componentDidMountSpy;
  let componentWillReceivePropsSpy;

  beforeEach(() => {
    requestAnimationFrameStub = sinon.stub(util, 'requestAnimationFrame');
    setExpandedSpy = sinon.spy(Collapse.prototype, 'setExpanded');
    componentDidMountSpy = sinon.spy(Collapse.prototype, 'componentDidMount');
    componentWillReceivePropsSpy = sinon.spy(
      Collapse.prototype,
      'componentWillReceiveProps',
    );
  });

  afterEach(() => {
    requestAnimationFrameStub.restore();
    setExpandedSpy.restore();
    componentDidMountSpy.restore();
    componentWillReceivePropsSpy.restore();
  });

  context('DOM element', () => {
    it('should include className when defined', () => {
      const className = 'collapse';
      expect(
        shallow(<Collapse className={className} />).prop('className'),
      ).to.equal(className);
    });

    it('inner block should have height: 0px when collapsed', () => {
      const wrapper = shallow(<Collapse />);
      expect(wrapper.prop('style').height).to.equal('0');
    });

    it('inner block should have height: 0px when open', () => {
      const wrapper = shallow(<Collapse isOpen />);
      expect(wrapper.prop('style').height).to.equal('0');
    });
  });
  context('Component', () => {
    it('should not requestAnimationFrame when open', () => {
      mount(
        <Collapse isOpen>
          <p>Content</p>
        </Collapse>,
      );
      sinon.assert.notCalled(requestAnimationFrameStub);
    });

    it('calls componentDidMount and setContentHeight with args auto', () => {
      mount(<Collapse isOpen />);
      sinon.assert.called(Collapse.prototype.componentDidMount);
      expect(Collapse.prototype.setExpanded.calledOnce).to.equal(true);
    });

    it('should update height when isOpen prop is changed to true', () => {
      const wrapper = mount(<Collapse />);
      wrapper.setProps({ isOpen: true });
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      expect(wrapper.find('div').prop('style').height).to.equal('0px');
    });

    it('should update visibility when isOpen prop is changed to true', () => {
      const wrapper = mount(<Collapse />);
      wrapper.setProps({ isOpen: true });
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      expect(wrapper.find('div').prop('style').visibility).to.equal('visible');
    });

    it('should update the height when isOpen is changed to false', () => {
      const wrapper = mount(<Collapse isOpen />);
      wrapper.setProps({ isOpen: false });
      wrapper.update();
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      expect(wrapper.find('div').prop('style').height).to.equal('0px');
    });

    it('calls requestAnimationFrame when collapsed', () => {
      const wrapper = mount(<Collapse isOpen />);
      wrapper.setProps({ isOpen: false });
      expect(requestAnimationFrameStub.called).to.equal(true);
    });
  });
});
