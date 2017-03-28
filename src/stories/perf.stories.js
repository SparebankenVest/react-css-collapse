import React from 'react';
import { storiesOf } from '@kadira/storybook';
import App from './App';
import { createElements } from '../data';

const elements = createElements(1000);
storiesOf('Collapse', module).add('long list', () => (<App elements={elements} />));
