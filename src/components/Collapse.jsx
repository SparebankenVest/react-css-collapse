import React, { useRef } from 'react';
import { string, bool, func, shape } from 'prop-types';
import useCollapse from './useCollapse';

function Collapse({
  isOpen,
  onRest,
  style: initialStyle,
  transition,
  className,
  alwaysAuto,
  ...rest
}) {
  const content = useRef(null);
  const { setIsExpandedStyle, setIsCollapsedStyle, style } = useCollapse({
    isOpen,
    content,
    alwaysAuto,
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
}

Collapse.defaultProps = {
  isOpen: false,
  onRest: null,
  style: null,
  className: 'react-css-collapse-transition',
  transition: null,
  alwaysAuto: null,
};

Collapse.propTypes = {
  isOpen: bool,
  onRest: func,
  style: shape({}),
  className: string,
  transition: string,
  alwaysAuto: bool,
};

export default Collapse;
