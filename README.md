# react-css-collapse
Component-wrapper for collapse animation with css for elements with variable and dynamic height

[![Build Status](https://travis-ci.org/SparebankenVest/react-css-collapse.svg?branch=master)](https://travis-ci.org/SparebankenVest/react-css-collapse)
[![npm version](https://img.shields.io/npm/v/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)
[![npm downloads](https://img.shields.io/npm/dm/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)

## Installation

Using [npm](https://www.npmjs.com/):

`npm install --save react-css-collapse`

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
import Collapse from 'react-css-collapse';

<Collapse isOpen={true || false}>
  <div>Random content</div>
</Collapse>
```

## Options

#### `isOpen`: PropTypes.boolean.isRequired

Expands or collapses content.

#### `children`: PropTypes.node.isRequired

One or multiple children with static, variable or dynamic height.

```js
<Collapse isOpen={true}>
  <p>Paragraph of text</p>
  <p>Another paragraph is also OK</p>
  <p>Images and any other content are ok too</p>
  <img src="cutecat.gif" />
</Collapse>
```

#### `onRest`: PropTypes.func
Callback function for when your transition on `height` (specified in `className`) is finished. It can be used to trigger any function after transition is done.

#### `className`: PropType.string

You can specify a className with your desired style and animation

```scss
.react-css-collapse-transition {
  transition: height 250ms cubic-bezier(.4, 0, .2, 1);
}
```

## Development and testing
To run example covering all features, use `npm run storybook`.

```bash
git clone [repo]
cd [repo]
npm install
npm run storybook
```
Open [http://localhost:6006](http://localhost:6006) 🎆
