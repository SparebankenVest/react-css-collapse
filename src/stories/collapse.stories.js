import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import App from './App';
import { elements } from '../data';

storiesOf('Collapse', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <App
      elements={elements}
      props={{
        className: text('className', 'react-css-collapse-transition'),
        transition: text('transition', ''),
      }}
    />
  ))
  .add('inline transition', () => (
    <App
      elements={elements}
      props={{
        className: text('className', ''),
        transition: text(
          'transition',
          'height 250ms cubic-bezier(.4, 0, .2, 1)',
        ),
      }}
    />
  ));
