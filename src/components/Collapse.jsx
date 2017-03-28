import React, { PropTypes, Component } from 'react';

class Collapse extends Component {
  componentWillReceiveProps(nextProps) {
    const height = this.content.scrollHeight;
    // expand
    if (!this.props.isOpen && nextProps.isOpen) {
      // have the element transition to the height of its inner content
      this.content.style.height = `${height}px`;
    }
    // collapse
    if (this.props.isOpen && !nextProps.isOpen) {
      const element = this.content;
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      element.style.height = `${height}px`;

      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      window.requestAnimationFrame(() => {
        element.style.height = '0px';
        element.style.overflow = 'hidden';
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
          ...this.props.style,
        }}
        className={this.props.className}
        onTransitionEnd={() => {
          if (this.props.isOpen) {
            this.content.style.height = 'auto';
            this.content.style.overflow = 'visible';
          }
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Collapse.defaultProps = {
  isOpen: false,
  className: null,
  style: null,
};

Collapse.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

export default Collapse;
