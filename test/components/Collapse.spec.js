import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import * as fakeRaf from 'fake-raf';
import util from '../../src/util';
import Collapse from '../../src/components/Collapse';

describe('<Collapse />', () => {
  let requestAnimationFrameStub;
  let setExpandedSpy;
  let getHeightStub;
  let componentDidMountSpy;
  let componentWillReceivePropsSpy;

  before(() => {
    fakeRaf.use();
  });

  beforeEach(() => {
    requestAnimationFrameStub = sinon.stub(util, 'requestAnimationFrame');
    setExpandedSpy = sinon.spy(Collapse.prototype, 'setExpanded');
    getHeightStub = sinon.stub(Collapse.prototype, 'getHeight').returns('20');
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
    getHeightStub.restore();
  });

  after(() => {
    fakeRaf.restore();
  });

  const makeWrapper = props => (
    <Collapse
      {...props}
    >
      <p>Content</p>
    </Collapse>
  );

  context('DOM element', () => {
    it('should include className when defined', () => {
      const className = 'collapse';
      expect(
        shallow(makeWrapper({ isOpen: true, className })).prop('className'),
      ).to.equal(className);
    });

    it('inner block should have height: 0px when collapsed', () => {
      const wrapper = shallow(makeWrapper());
      expect(wrapper.prop('style').height).to.equal('0');
    });

    it('inner block should have height: 0px when open', () => {
      const wrapper = shallow(makeWrapper({ isOpen: true }));
      expect(wrapper.prop('style').height).to.equal('0');
    });
  });

  context('Component', () => {
    it('should not requestAnimationFrame when open', () => {
      mount(makeWrapper({ isOpen: true }));
      sinon.assert.notCalled(requestAnimationFrameStub);
    });

    it('should be able to set the transition through the transition prop', () => {
      const transition = 'height 250ms cubic-bezier(.4, 0, .2, 1)';
      const wrapper = mount(makeWrapper({ isOpen: true, transition }));
      expect(wrapper.find('div').prop('style').transition).to.equal(transition);
    });

    it('calls componentDidMount and setContentHeight with args auto', () => {
      mount(makeWrapper({ isOpen: true }));
      sinon.assert.called(Collapse.prototype.componentDidMount);
      expect(Collapse.prototype.setExpanded.calledOnce).to.equal(true);
    });

    it('should update height when isOpen prop is changed to true', () => {
      const wrapper = mount(makeWrapper());
      wrapper.setProps({ isOpen: true });
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      expect(wrapper.find('div').prop('style').height).to.equal('20px');
    });

    it('should update visibility when isOpen prop is changed to true', () => {
      const wrapper = mount(makeWrapper());
      wrapper.setProps({ isOpen: true });
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      expect(wrapper.find('div').prop('style').visibility).to.equal('visible');
    });

    it('should first set the height from auto to height to 0', (done) => {
      requestAnimationFrameStub.restore();
      const wrapper = mount(makeWrapper({ isOpen: true }));
      let styles = wrapper.find('div').prop('style');
      expect(styles.height).to.equal('auto');
      expect(styles.overflow).to.equal('visible');

      wrapper.setProps({ isOpen: false });
      sinon.assert.called(Collapse.prototype.componentWillReceiveProps);
      styles = wrapper.find('div').prop('style');
      wrapper.update();

      expect(styles.height).to.equal('20px');
      expect(styles.overflow).to.equal('visible');

      fakeRaf.step();
      setTimeout(() => {
        wrapper.update();
        styles = wrapper.find('div').prop('style');
        expect(styles.height).to.equal('0');
        expect(styles.overflow).to.equal('hidden');
        done();
      });
    });
  });
});
