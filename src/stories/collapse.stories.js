import React from 'react';
import { storiesOf } from '@kadira/storybook';
import App from './App';
import { elements } from '../data';

storiesOf('Collapse', module).add('default', () => (<App elements={elements} />));
