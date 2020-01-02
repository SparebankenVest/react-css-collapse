import React, { useRef } from 'react';
import { string, bool, func, shape } from 'prop-types';
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

Collapse.defaultProps = {
  isOpen: false,
  onRest: undefined,
  style: undefined,
  className: 'react-css-collapse-transition',
  transition: undefined,
};

Collapse.propTypes = {
  isOpen: bool,
  onRest: func,
  style: shape({}),
  className: string,
  transition: string,
};

export default Collapse;
