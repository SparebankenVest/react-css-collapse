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
  const content = useRef(null);
  const { expand, collapse, style } = useCollapse({ transition, isOpen, content });

  const onTransitionEnd = (e) => {
    if (e.target === content && e.propertyName === 'height') {
      if (isOpen) {
        expand();
      } else {
        collapse();
      }
      if (onRest) {
        onRest();
      }
    }
  };

  return (
    <div
      ref={content}
      style={style}
      className={className}
      onTransitionEnd={onTransitionEnd}
      {...attrs}
    >
      {children}
    </div>
  );
};

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
