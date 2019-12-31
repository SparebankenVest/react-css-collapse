import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import App from './App';
import { elements } from '../data';

storiesOf('Collapse', module)
  .addDecorator(withKnobs)
  .add('default', () => <App elements={elements} initialIndex={null} />)
  .add('initially toggled', () => <App elements={elements} initialIndex={1} />)
  .add('custom style transition ', () => (
    <App
      elements={elements}
      props={{
        className: text('className', ''),
        style: {
          transition: text(
            'transition',
            'height 5000ms cubic-bezier(.4, 0, .2, 1)',
          ),
        },
      }}
    />
  ))
  .add('custom transition property', () => (
    <App
      elements={elements}
      props={{
        className: text('className', ''),
        transition: text(
          'transition',
          'height 500ms cubic-bezier(.4, 0, .2, 1)',
        ),
      }}
    />
  ))
  .add('custom className transition', () => (
    <App
      elements={elements}
      props={{
        className: text('className', 'react-css-collapse-transition-custom'),
      }}
    />
  ));
