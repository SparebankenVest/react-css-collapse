import React, { useRef } from 'react';
import { string, bool, func, object } from 'prop-types';
import useCollapse from './useCollapse';

const Collapse = ({
  isOpen,
  onRest,
  style: initialStyle,
  transition,
  className,
  ...rest
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

  const styles = {
    willChange: 'height',
    transition,
    ...initialStyle,
    ...style,
  };

  return (
    <div
      ref={content}
      style={styles}
      className={className}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    />
  );
};

Collapse.defaultProps = {
  isOpen: false,
  className: 'react-css-collapse-transition',
};

Collapse.propTypes = {
  isOpen: bool,
  onRest: func,
  style: object,
  className: string,
  transition: string,
};

export default Collapse;
