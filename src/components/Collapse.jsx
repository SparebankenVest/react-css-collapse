import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useCollapse from './useCollapse';

const Collapse = ({
  children,
  className,
  isOpen,
  transition,
  onRest,
  ...attrs
}) => {
  const content = useRef();
  const { setIsExpandedStyle, setIsCollapsedStyle, style } = useCollapse({
    isOpen,
    content,
  });

  const onTransitionEnd = e => {
    if (e.target === content.current && e.propertyName === 'height') {
      if (isOpen) {
        setIsExpandedStyle();
      } else {
        setIsCollapsedStyle();
      }
      if (onRest) {
        onRest();
      }
    }
  };

  return (
    <div
      ref={content}
      style={{ ...style, transition }}
      className={className}
      onTransitionEnd={onTransitionEnd}
      {...attrs}
    >
      {children}
    </div>
  );
};

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
