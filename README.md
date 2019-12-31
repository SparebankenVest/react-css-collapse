# react-css-collapse
Collapse component with css transition for elements with variable and dynamic height.

[![Build Status](https://travis-ci.org/SparebankenVest/react-css-collapse.svg?branch=master)](https://travis-ci.org/SparebankenVest/react-css-collapse)
[![npm version](https://img.shields.io/npm/v/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)
[![npm downloads](https://img.shields.io/npm/dm/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)

## Demo
### - [Accordion using react-css-collapse](https://codesandbox.io/embed/accordion-using-react-css-collapse-w5r1e)

You can specify transition using the style prop or a class selector with transition.
The `react-css-collapse-transition` class selector is added by default unless you specify your own. 

🙈 Note: Remember to specify the style if you are using the default selector👇

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

#### `isOpen`: PropTypes.boolean

Expands or collapses content.

#### `children`: PropTypes.node

```js
<Collapse isOpen={true}>
  <p>Paragraph of text</p>
  <p>Another paragraph is also OK</p>
  <p>Images and any other content are ok too</p>
  <img src="cutecat.gif" />
</Collapse>
```

#### `className`: PropType.string

You can specify a className with your desired style and transition (animation).
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
