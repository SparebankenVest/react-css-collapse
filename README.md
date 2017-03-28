# react-css-collapse
Component-wrapper for collapse animation with css for elements with variable and dynamic height

### Collapse

## Usage
```js
<Collapse isOpened={true || false}>
  <div>Random content</div>
</Collapse>
```

## Options

#### `isOpened`: PropTypes.boolean.isRequired

Expands or collapses content.

#### `children`: PropTypes.node.isRequired

One or multiple children with static, variable or dynamic height.

```js
<Collapse isOpened={true}>
  <p>Paragraph of text</p>
  <p>Another paragraph is also OK</p>
  <p>Images and any other content are ok too</p>
  <img src="cutecat.gif" />
</Collapse>
```

### `className`: PropType.string

You can specify a className with your desired style and animation

```scss
.collapse-transition-example {
  transition: transform 250ms cubic-bezier(.4, 0, .2, 1);
}
```

### `style`: PropType.shape({})

You can specify style as you desire. Maybe include some animation?

```js
const style= {
  transition: 'height 250ms cubic-bezier(.4, 0, .2, 1)',
  WebKitTransition: 'height 250ms cubic-bezier(.4, 0, .2, 1)',
};
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
