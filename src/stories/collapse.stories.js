import React from 'react';
import { storiesOf } from '@storybook/react';
import App from './App';
import { elements } from '../data';

storiesOf('Collapse', module).add('default', () => <App elements={elements} />);
