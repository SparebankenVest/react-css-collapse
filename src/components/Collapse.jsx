import React, { useRef } from 'react';
import { string, bool, func, shape } from 'prop-types';
import useCollapse from './useCollapse';

function Collapse({
  isOpen,
  onRest,
  style: initialStyle,
  transition,
  className,
  ...rest
}) {
  const content = useRef(null);
  const { setIsExpandedStyle, setIsCollapsedStyle, style } = useCollapse({
    isOpen,
    content,
  });

  const onTransitionEnd = (e) => {
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
  transition: 'height 250ms cubic-bezier(0.4, 0, 0.2, 1)',
};

Collapse.propTypes = {
  isOpen: bool,
  onRest: func,
  style: shape({}),
  className: string,
  transition: string,
};

export default Collapse;
