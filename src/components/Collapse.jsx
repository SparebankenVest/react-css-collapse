import React, { PropTypes, Component } from 'react';
import util from '../util';

class Collapse extends Component {
  componentDidMount() {
    if (this.props.isOpen) {
      // temporarily disable css transition
      const transition = this.content.style.transition;
      this.content.style.transition = '';

      // on the next frame (as soon as removing transition has taken effect)
      util.requestAnimationFrame(() => {
        // have the element set to the height of its inner content without transition
        this.content.style.height = `${this.content.scrollHeight}px`;
        this.content.style.transition = transition;
      });
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
      window.requestAnimationFrame(() => {
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
