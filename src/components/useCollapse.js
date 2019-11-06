import { useEffect, useState } from 'react';

const useCollapse = ({ transition, isOpen, content }) => {
  const [height, setHeight] = useState('0');
  const [overflow, setOverflow] = useState('hidden');
  const [visibility, setVisibility] = useState('hidden');

  const expand = () => {
    setHeight('auto');
    setOverflow('visible');
    setVisibility('visible');
  };

  const collapse = () => {
    setVisibility('hidden');
  };

  const getHeight = () => `${content.current.scrollHeight}px`;

  useEffect(
    () => {
      if (content && isOpen) {
        expand();
      }
    },
    [content],
  );

  useEffect(
    () => {
      if (!content.current) {
        return;
      }
      if (isOpen) {
        setHeight(getHeight());
        setVisibility('visible');
      } else {
        setHeight(getHeight());
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            setHeight('0');
            setOverflow('hidden');
          });
        });
      }
    },
    [isOpen],
  );

  return {
    expand,
    collapse,
    style: {
      overflow,
      visibility,
      height,
      transition,
    },
  };
};

export default useCollapse;
