# react-css-collapse
Component-wrapper for collapse animation with css for elements with variable and dynamic height

[![Greenkeeper badge](https://badges.greenkeeper.io/SparebankenVest/react-css-collapse.svg)](https://greenkeeper.io/)

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

#### `onTransitionEnd`: PropTypes.func

A function that is called each time the expand or collapse animation has finished

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
