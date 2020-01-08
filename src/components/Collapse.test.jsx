import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Collapse from './Collapse';

function getWindowFromNode(node) {
  // istanbul ignore next I'm not sure what could cause the final else so we'll leave it uncovered.
  if (node.defaultView) {
    // node is document
    return node.defaultView;
  }
  if (node.ownerDocument && node.ownerDocument.defaultView) {
    // node is a DOM node
    return node.ownerDocument.defaultView;
  }
  if (node.window) {
    // node is window
    return node.window;
  }
  // no idea...
  throw new Error(
    `Unable to find the "window" object for the given node. fireEvent currently supports firing events on DOM nodes, document, and window. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new`,
  );
}
describe('Collapse', () => {
  test('default', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse data-testid="collapse" />);
    });
    const el = component.getByTestId('collapse');
    expect(el).toHaveStyle(
      'will-change: height; overflow: hidden; visibility: hidden; height: 0px;',
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
      'will-change: height; overflow: hidden; visibility: visible; height: auto;',
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('when open after transition end', async () => {
    let component;

    await act(async () => {
      component = render(<Collapse isOpen data-testid="collapse" />);
    });
    const el = component.getByTestId('collapse');
    const event = new window.Event('transitionend', {
      bubbles: true,
      cancelable: true,
    });
    event.propertyName = 'height';
    fireEvent(el, event);
    expect(el).toHaveStyle(
      'will-change: height; overflow: visible; visibility: visible; height: auto;',
    );
    expect(component.asFragment()).toMatchSnapshot();
  });
});
