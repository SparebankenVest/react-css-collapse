import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import util from '../util';

class Collapse extends PureComponent {
  constructor(props) {
    super(props);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.setExpanded = this.setExpanded.bind(this);
    this.setCollapsed = this.setCollapsed.bind(this);

    this.state = {
      willChange: 'height',
      height: '0',
      overflow: 'hidden',
      visibility: 'hidden',
      transition: props.transition,
    };
  }

  componentDidMount() {
    if (this.content && this.props.isOpen) {
      this.setExpanded();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.content) {
      return;
    }

    // If the transition is changed lets update it
    if (this.props.transition !== prevProps.transition) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ transition: this.props.transition });
    }

    // expand
    if (!prevProps.isOpen && this.props.isOpen) {
      // have the element transition to the height of its inner content
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        height: `${this.getHeight()}px`,
        visibility: 'visible',
      });
    }

    // collapse
    if (prevProps.isOpen && !this.props.isOpen) {
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ height: `${this.getHeight()}px` });
      util.requestAnimationFrame(() => {
        // "pausing" the JavaScript execution to let the rendering threads catch up
        // http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
        setTimeout(() => {
          this.setState({
            height: '0',
            overflow: 'hidden',
          });
        });
      });
    }
  }

  onTransitionEnd(e) {
    const { onRest, isOpen } = this.props;

    if (e.target === this.content && e.propertyName === 'height') {
      if (isOpen) {
        this.setExpanded();
      } else {
        this.setCollapsed();
      }
      if (onRest) {
        onRest();
      }
    }
  }

  getHeight() {
    return this.content.scrollHeight;
  }

  setCollapsed() {
    this.setState({ visibility: 'hidden' });
  }

  setExpanded() {
    this.setState({
      height: 'auto',
      overflow: 'visible',
      visibility: 'visible',
    });
  }

  render() {
    const {
      className,
      children,
      isOpen,
      transition,
      onRest,
      ...attrs
    } = this.props;
    return (
      <div
        ref={(el) => {
          this.content = el;
        }}
        style={this.state}
        className={className}
        onTransitionEnd={this.onTransitionEnd}
        {...attrs}
      >
        {children}
      </div>
    );
  }
}

Collapse.displayName = 'Collapse';

Collapse.defaultProps = {
  children: null,
  className: 'react-css-collapse-transition',
  isOpen: false,
  transition: null,
  onRest: null,
};

Collapse.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  transition: PropTypes.string,
  onRest: PropTypes.func,
};

export default Collapse;
