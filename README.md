# react-css-collapse
Collapse component with css transition for elements with variable and dynamic height.

[![Build Status](https://travis-ci.org/SparebankenVest/react-css-collapse.svg?branch=master)](https://travis-ci.org/SparebankenVest/react-css-collapse)
[![npm version](https://img.shields.io/npm/v/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)
[![npm downloads](https://img.shields.io/npm/dm/react-css-collapse.svg?style=flat-square)](https://www.npmjs.com/package/react-css-collapse)

## Example
### [Accordion using react-css-collapse](https://codesandbox.io/embed/accordion-using-react-css-collapse-w5r1e)

## Install
[![rc-collapse](https://nodei.co/npm/react-css-collapse.png)](https://npmjs.org/package/react-css-collapse)

## Support
Global coverage > 92% - [browserl.ist](https://browserl.ist/?q=%22%3E0.2%25%22%2C%22not+dead%22%2C%22not+op_mini+all%22%2C%22ios_saf+%3E%3D+10%22)

## Usage

```jsx
import Collapse from 'react-css-collapse';

<Collapse isOpen={true || false}>
  <div>content</div>
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
Specify transition using the class selector with transition or the style property.
The `react-css-collapse-transition` class selector is added by default unless you specify your own. Note: Remember to include the style if you are using the default selector 👇

```scss
.react-css-collapse-transition {
  transition: height 250ms cubic-bezier(.4, 0, .2, 1);
}
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
