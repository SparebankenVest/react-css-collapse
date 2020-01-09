import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Collapse from './Collapse';

function transitionEndEventWithHeightProperty(el) {
  const event = new window.Event('transitionend', {
    bubbles: true,
    cancelable: true,
  });
  event.propertyName = 'height';
  fireEvent(el, event);
}

describe('Collapse', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb();
    });
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  test('default', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse data-testid="collapse" />);
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveStyle(
      'overflow: hidden; visibility: hidden; height: 0px;',
    );
    expect(el).toHaveClass('react-css-collapse-transition');
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with children', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse data-testid="collapse">children</Collapse>);
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveTextContent('children');
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with class', async () => {
    let component;
    await act(async () => {
      component = render(
        <Collapse data-testid="collapse" className="className" />,
      );
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveClass('className');
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with style', async () => {
    let component;
    await act(async () => {
      component = render(
        <Collapse
          data-testid="collapse"
          style={{ transition: 'height 1337ms cubic-bezier(.4, 0, .2, 1)' }}
        />,
      );
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveStyle(
      'will-change: height; overflow: hidden; visibility: hidden; height: 0px; transition: height 1337ms cubic-bezier(.4, 0, .2, 1);',
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with transition prop', async () => {
    let component;
    await act(async () => {
      component = render(
        <Collapse
          data-testid="collapse"
          transition="height 1337ms cubic-bezier(.4, 0, .2, 1)"
        />,
      );
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveStyle(
      'will-change: height; overflow: hidden; visibility: hidden; height: 0px; transition: height 1337ms cubic-bezier(.4, 0, .2, 1);',
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with aria and data props', async () => {
    let component;
    await act(async () => {
      component = render(
        <Collapse aria-hidden data-any-value="1337" data-testid="collapse" />,
      );
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveAttribute('data-any-value', '1337');
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('when open before transition end', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse isOpen data-testid="collapse" />);
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveStyle(
      'overflow: hidden; visibility: visible; height: auto;',
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('when open after transition end', async () => {
    let component;

    await act(async () => {
      component = render(<Collapse isOpen data-testid="collapse" />);
    });
    const el = component.getByTestId('collapse');
    transitionEndEventWithHeightProperty(el);
    expect(el).toHaveStyle(
      'overflow: visible; visibility: visible; height: auto;',
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('lifecycle', async () => {
    // Render default collapsed
    const { getByTestId, rerender } = render(
      <Collapse data-testid="collapse" />,
    );
    expect(getByTestId('collapse')).toHaveStyle(
      'visibility: hidden; overflow: hidden;',
    );

    // Expand
    rerender(<Collapse data-testid="collapse" isOpen />);
    const el = getByTestId('collapse');
    // Style during transition
    expect(el).toHaveStyle('visibility: visible; overflow: hidden;');
    // Finished expand transition
    transitionEndEventWithHeightProperty(el);
    // Style after transition
    expect(el).toHaveStyle(
      'visibility: visible; overflow: visible; height: auto;',
    );

    // Collapse
    rerender(<Collapse data-testid="collapse" />);
    const elCollapsed = getByTestId('collapse');
    // Style during transition
    expect(elCollapsed).toHaveStyle('visibility: visible; overflow: visible;');

    await act(async () => {
      // Collapse transition finished
      transitionEndEventWithHeightProperty(elCollapsed);
    });

    // Style after transition
    expect(elCollapsed).toHaveStyle(
      'visibility: hidden; overflow: hidden; height: 0px',
    );
  });
});
