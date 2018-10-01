# react-css-collapse
Collapse component with css transition for elements with variable and dynamic height.

[![Build Status](https://travis-ci.org/SparebankenVest/react-css-collapse.svg?branch=master)](https://travis-ci.org/SparebankenVest/react-css-collapse)
[![npm version](https://img.shields.io/npm/v/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)
[![npm downloads](https://img.shields.io/npm/dm/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)

:warning: ️You need to specify the transition property or add a class selector with style (transition) in your own stylesheet to add animation. You can copy the smashing example below 💅

```scss
.react-css-collapse-transition {
  transition: height 250ms cubic-bezier(.4, 0, .2, 1);
}
```

## Installation

`npm install --save react-css-collapse`

```js
import Collapse from 'react-css-collapse';

<Collapse isOpen={true || false}>
  <div>Random content</div>
</Collapse>
```

## Properties

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

#### `className`: PropType.string

You can specify a className with your desired style and animation. By default `react-css-collapse-transition` will be added to the component.

#### `transition`: PropType.string

You can also specify a transition in line by using the `transition` prop.

```js
<Collapse transition="height 250ms cubic-bezier(.4, 0, .2, 1)">
  <p>Paragraph of text</p>
</Collapse>
```

#### `onRest`: PropTypes.func
Callback function for when your transition on `height` (specified in `className`) is finished. It can be used to trigger any function after transition is done.

### ARIA and data attributes

`Collapse` transfers `aria-` and `data-` attributes to the component's rendered DOM element. For example this can be used to set the `aria-hidden` attribute:

```js
<Collapse isOpen={isOpenState} aria-hidden={isOpenState ? 'false' : 'true'}>
  <p>Paragraph of text</p>
</Collapse>
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
