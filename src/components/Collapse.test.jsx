import React from 'react';
import { render, act } from '@testing-library/react';
import Collapse from './Collapse';

describe('Collapse', () => {
  test('default', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse />);
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with children', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse>children</Collapse>);
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with class', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse className="className" />);
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with style', async () => {
    let component;
    await act(async () => {
      component = render(
        <Collapse
          style={{ transition: 'height 1337ms cubic-bezier(.4, 0, .2, 1)' }}
        />,
      );
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with transition prop', async () => {
    let component;
    await act(async () => {
      component = render(
        <Collapse transition="height 1337ms cubic-bezier(.4, 0, .2, 1)" />,
      );
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('with aria and data props', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse aria-hidden data-any-value="1337" />);
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  test('when open', async () => {
    let component;
    await act(async () => {
      component = render(<Collapse isOpen />);
    });
    expect(component.asFragment()).toMatchSnapshot();
  });
});
