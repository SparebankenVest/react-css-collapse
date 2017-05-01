import React, { PropTypes, Component } from 'react';
import util from '../util';

const initialStyle = {
  willChange: 'height',
  height: '0px',
  overflow: 'hidden',
};

class Collapse extends Component {
  constructor() {
    super();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.setExpanded = this.setExpanded.bind(this);
    this.setCollapsed = this.setCollapsed.bind(this);
  }

  componentDidMount() {
    if (this.content && this.props.isOpen) {
      this.setExpanded();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.content) {
      return;
    }

    // expand
    if (!this.props.isOpen && nextProps.isOpen) {
      // have the element transition to the height of its inner content
      this.setContentStyleProperty('height', `${this.content.scrollHeight}px`);
    }

    // collapse
    if (this.props.isOpen && !nextProps.isOpen) {
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      this.setContentStyleProperty('height', `${this.content.scrollHeight}px`);
      util.requestAnimationFrame(() => {
        // "pausing" the JavaScript execution to let the rendering threads catch up
        // http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
        setTimeout(() => {
          this.setCollapsed();
        }, 0);
      });
    }
  }

  onTransitionEnd(e) {
    if (this.props.isOpen) {
      this.setExpanded();
    }

    if (this.props.onRest && e.target === this.content && e.propertyName === 'height') {
      this.props.onRest();
    }
  }

  setContentStyleProperty(property, value) {
    this.content.style[property] = value;
  }

  setCollapsed() {
    this.setContentStyleProperty('height', '0px');
    this.setContentStyleProperty('overflow', 'hidden');
  }

  setExpanded() {
    this.setContentStyleProperty('height', 'auto');
    this.setContentStyleProperty('overflow', 'visible');
  }

  render() {
    return (
      <div
        ref={(el) => { this.content = el; }}
        style={initialStyle}
        className={this.props.className}
        onTransitionEnd={this.onTransitionEnd}
      >
        {this.props.children && this.props.children}
      </div>
    );
  }
}

Collapse.defaultProps = {
  isOpen: false,
  className: null,
  children: null,
  onRest: null,
};

Collapse.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  onRest: PropTypes.func,
};

export default Collapse;
