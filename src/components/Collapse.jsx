import React, { PropTypes, Component } from 'react';
import util from '../util';

class Collapse extends Component {
  componentDidMount() {
    if (this.props.isOpen) {
      this.setContentProperty('height', 'auto');
    }
  }
  componentWillReceiveProps(nextProps) {
    // expand
    if (!this.props.isOpen && nextProps.isOpen) {
      // have the element transition to the height of its inner content
      this.setContentProperty('height', `${this.content.scrollHeight}px`);
    }
    // collapse
    if (this.props.isOpen && !nextProps.isOpen) {
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      this.setContentProperty('height', `${this.content.scrollHeight}px`);
      util.requestAnimationFrame(() => {
        // "pausing" the JavaScript execution to let the rendering threads catch up
        // http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
        setTimeout(() => {
          this.setContentProperty('height', '0px');
          this.setContentProperty('overflow', 'hidden');
        }, 0);
      });
    }
  }

  setContentProperty(property, value) {
    this.content.style[property] = value;
  }

  render() {
    return (
      <div
        ref={(el) => { this.content = el; }}
        style={{
          willChange: 'height',
          height: '0px',
          overflow: 'hidden',
        }}
        className={this.props.className}
        onTransitionEnd={() => {
          if (this.props.isOpen) {
            this.setContentProperty('height', 'auto');
            this.setContentProperty('overflow', 'visible');
          }
        }}
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
};

Collapse.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
};

export default Collapse;
