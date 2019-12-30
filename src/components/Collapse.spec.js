import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {act} from 'react-dom/test-utils';
import * as fakeRaf from 'fake-raf';
import util from '../util';
import Collapse from './Collapse';

Enzyme.configure({adapter: new Adapter()});

describe('<Collapse />', () => {
  let requestAnimationFrameSpy;

  beforeAll(() => {
    fakeRaf.use();
  });

  beforeEach(() => {
    requestAnimationFrameSpy = jest.spyOn(util, 'requestAnimationFrame');
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  afterAll(() => {
    fakeRaf.restore();
  });

  const makeWrapper = props => (
    <Collapse {...props}>
      <p>Content</p>
    </Collapse>
  );

  describe('DOM element', () => {
    it('should include className when defined', () => {
      const className = 'collapse';
      act(() => {
        expect(
          mount(makeWrapper({isOpen: true, className})).prop('className'),
        ).toEqual(className);
      });
    });

    it('inner block should have height: 0px when collapsed', () => {
      const wrapper = mount(makeWrapper());
      act(() => {
        expect(wrapper.find('div').prop('style').height).toEqual('0px');
      });
    });

    it('inner block should have height: 0px when open', () => {
      const wrapper = mount(makeWrapper({isOpen: true}));
      act(() => {
        expect(wrapper.find('div').prop('style').height).toEqual('0px');
      });
    });

    it('should pass data- and aria-props as attributes', () => {
      act(() => {
        const wrapper = mount(
          makeWrapper({
            'aria-hidden': 'true',
            'data-any-value': 'xyz',
          }),
        );
        expect(wrapper.prop('aria-hidden')).toEqual('true');
        expect(wrapper.prop('data-any-value')).toEqual('xyz');
      });
    });
  });

  describe('Component', () => {
    it('should not requestAnimationFrame when open', () => {
      act(() => {
        mount(makeWrapper({isOpen: true}));
        expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
      });
    });

    it('should be able to set the transition through the transition prop', () => {
      const transition = 'height 250ms cubic-bezier(.4, 0, .2, 1)';
      act(() => {
        const wrapper = mount(makeWrapper({isOpen: true, transition}));
        expect(wrapper.find('div').prop('style').transition).toEqual(
          transition,
        );
      });
    });

    it('should not add an inline transition if it is not specified', () => {
      act(() => {
        const wrapper = mount(makeWrapper({isOpen: true}));
        expect(wrapper.find('div').prop('style').transition).toEqual(null);
      });
    });

    /**
     * No longer valid as we're migrating away from lifecycles
     */
    xit('calls componentDidMount and setContentHeight with args auto', () => {
      mount(makeWrapper({isOpen: true}));
      expect(jest.fn()).toHaveBeenCalledTimes(1);
    });

    xit('should update height when isOpen prop is changed to true', () => {
      act(() => {
        const wrapper = mount(makeWrapper());
        wrapper.setProps({isOpen: true});
        expect(wrapper.find('div').prop('style').height).toEqual('20px');
      });
    });

    xit('should update visibility when isOpen prop is changed to true', () => {
      act(() => {
        const wrapper = mount(makeWrapper());
        wrapper.setProps({isOpen: true});
        expect(jest.fn()).toHaveBeenCalledTimes(1);
        expect(wrapper.find('div').prop('style').visibility).toEqual('visible');
      });
    });

    xit('should first set the height from auto to height to 0', done => {
      act(() => {
        requestAnimationFrameSpy.mockRestore();
        const wrapper = mount(makeWrapper({isOpen: true}));
        let styles = wrapper.find('div').prop('style');
        expect(styles.height).toEqual('auto');
        expect(styles.overflow).toEqual('visible');

        wrapper.setProps({isOpen: false});
        // wrapper.update();
        styles = wrapper.find('div').prop('style');

        expect(styles.height).toEqual('20px');
        expect(styles.overflow).toEqual('visible');

        fakeRaf.step();
        setTimeout(() => {
          styles = wrapper.find('div').prop('style');
          expect(styles.height).toEqual('0');
          expect(styles.overflow).toEqual('hidden');
          done();
        });
      });
    });
  });
});
