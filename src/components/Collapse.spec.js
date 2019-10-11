import React from 'react';
import { mount, shallow } from 'enzyme';
import * as fakeRaf from 'fake-raf';
import util from '../../src/util';
import Collapse from '../../src/components/Collapse';

describe('<Collapse />', () => {
  let requestAnimationFrameSpy;
  let setExpandedSpy;
  let componentDidMountSpy;
  let componentDidUpdateSpy;

  beforeAll(() => {
    fakeRaf.use();
    Collapse.prototype.getHeight = () => 20;
  });

  beforeEach(() => {
    requestAnimationFrameSpy = jest.spyOn(util, 'requestAnimationFrame');
    setExpandedSpy = jest.spyOn(Collapse.prototype, 'setExpanded');
    componentDidMountSpy = jest.spyOn(Collapse.prototype, 'componentDidMount');
    componentDidUpdateSpy = jest.spyOn(
      Collapse.prototype,
      'componentDidUpdate',
    );
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
    setExpandedSpy.mockRestore();
    componentDidMountSpy.mockRestore();
    componentDidUpdateSpy.mockRestore();
  });

  afterAll(() => {
    fakeRaf.restore();
  });

  const makeWrapper = props => (
    <Collapse
      {...props}
    >
      <p>Content</p>
    </Collapse>
  );

  describe('DOM element', () => {
    it('should include className when defined', () => {
      const className = 'collapse';
      expect(
        shallow(makeWrapper({ isOpen: true, className })).prop('className'),
      ).toEqual(className);
    });

    it('inner block should have height: 0px when collapsed', () => {
      const wrapper = shallow(makeWrapper());
      expect(wrapper.prop('style').height).toEqual('0');
    });

    it('inner block should have height: 0px when open', () => {
      const wrapper = shallow(makeWrapper({ isOpen: true }));
      expect(wrapper.prop('style').height).toEqual('0');
    });

    it('should pass data- and aria-props as attributes', () => {
      const wrapper = shallow(makeWrapper({
        'aria-hidden': 'true', 'data-any-value': 'xyz',
      }));
      expect(wrapper.prop('aria-hidden')).toEqual('true');
      expect(wrapper.prop('data-any-value')).toEqual('xyz');
    });
  });

  describe('Component', () => {
    it('should not requestAnimationFrame when open', () => {
      mount(makeWrapper({ isOpen: true }));
      expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    });

    it('should be able to set the transition through the transition prop', () => {
      const transition = 'height 250ms cubic-bezier(.4, 0, .2, 1)';
      const wrapper = mount(makeWrapper({ isOpen: true, transition }));
      expect(wrapper.find('div').prop('style').transition).toEqual(transition);
    });

    it('should not add an inline transition if it is not specified', () => {
      const wrapper = mount(makeWrapper({ isOpen: true }));
      expect(wrapper.find('div').prop('style').transition).toEqual(null);
    });

    it('calls componentDidMount and setContentHeight with args auto', () => {
      mount(makeWrapper({ isOpen: true }));
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });

    it('should update height when isOpen prop is changed to true', () => {
      const wrapper = mount(makeWrapper());
      wrapper.setProps({ isOpen: true });
      expect(componentDidUpdateSpy).toHaveBeenCalled();
      wrapper.update();
      expect(wrapper.find('div').prop('style').height).toEqual('20px');
    });

    it('should update visibility when isOpen prop is changed to true', () => {
      const wrapper = mount(makeWrapper());
      wrapper.setProps({ isOpen: true });
      expect(componentDidUpdateSpy).toHaveBeenCalled();
      wrapper.update();
      expect(wrapper.find('div').prop('style').visibility).toEqual('visible');
    });

    it('should first set the height from auto to height to 0', (done) => {
      requestAnimationFrameSpy.mockRestore();
      const wrapper = mount(makeWrapper({ isOpen: true }));
      let styles = wrapper.find('div').prop('style');
      expect(styles.height).toEqual('auto');
      expect(styles.overflow).toEqual('visible');

      wrapper.setProps({ isOpen: false });
      expect(componentDidUpdateSpy).toHaveBeenCalled();
      wrapper.update();
      styles = wrapper.find('div').prop('style');
      wrapper.update();

      expect(styles.height).toEqual('20px');
      expect(styles.overflow).toEqual('visible');

      fakeRaf.step();
      setTimeout(() => {
        wrapper.update();
        styles = wrapper.find('div').prop('style');
        expect(styles.height).toEqual('0');
        expect(styles.overflow).toEqual('hidden');
        done();
      });
    });
  });
});
