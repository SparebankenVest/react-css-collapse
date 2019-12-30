import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import App from './App';
import { createElements } from '../data';

const elements = createElements(1000);
storiesOf('Collapse', module)
  .addDecorator(withKnobs)
  .add('long list', () => (
    <App
      elements={elements}
      props={{
        className: text('className', 'react-css-collapse-transition'),
        transition: text('transition', ''),
      }}
    />
  ));
