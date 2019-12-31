import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import Collapse from '../components/Collapse';
import './style.css';
import { text } from '../data';

const Content = () => {
  const [content, setContent] = useState([text[0]]);
  return (
    <section>
      <button type="button" onClick={() => setContent([...content, text[0]])}>
        Add content
      </button>
      <p>{content}</p>
    </section>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.initialIndex,
    };
    this.setIndex = this.setIndex.bind(this);
  }

  setIndex(i) {
    const { index } = this.state;
    if (index !== i) {
      this.setState({ index: i });
    } else {
      this.setState({ index: null });
    }
  }

  render() {
    const { elements, props } = this.props;
    const { index } = this.state;
    return (
      <main>
        <section>
          {elements.map((element, i) => (
            <div key={`element-collapse-element-${element.name}`}>
              <button
                onClick={() => this.setIndex(i)}
                style={{ width: '100%' }}
                type="button"
              >
                {element.name}
              </button>
              <Collapse
                isOpen={index === i}
                onRest={() => action('onRest')}
                {...props}
              >
                <div style={{ background: 'lightpink', padding: '20px' }}>
                  <Content />
                </div>
              </Collapse>
            </div>
          ))}
        </section>
        <h3>Other content...</h3>
      </main>
    );
  }
}

App.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  props: PropTypes.shape({
    className: PropTypes.string,
    transition: PropTypes.string,
  }),
};

export default App;
