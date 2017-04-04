import React, { PropTypes, Component } from 'react';
import util from '../util';

class Collapse extends Component {
  componentDidMount() {
    if (this.props.isOpen) {
      this.content.style.height = 'auto';
    }
  }
  componentWillReceiveProps(nextProps) {
    const element = this.content;
    const height = element.scrollHeight;
    // expand
    if (!this.props.isOpen && nextProps.isOpen) {
      // have the element transition to the height of its inner content
      element.style.height = `${height}px`;
    }
    // collapse
    if (this.props.isOpen && !nextProps.isOpen) {
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      element.style.height = `${height}px`;
      util.requestAnimationFrame(() => {
        // "pausing" the JavaScript execution to let the rendering threads catch up
        // http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
        setTimeout(() => {
          element.style.height = '0px';
          element.style.overflow = 'hidden';
        }, 0);
      });
    }
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
            this.content.style.height = 'auto';
            this.content.style.overflow = 'visible';
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
