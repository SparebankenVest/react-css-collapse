import { useEffect, useState } from 'react';

const useCollapse = ({ isOpen, content }) => {
  const [height, setHeight] = useState('0');
  const [overflow, setOverflow] = useState('hidden');
  const [visibility, setVisibility] = useState('hidden');
  const [isFirstRender, setIsFirstRender] = useState(true);

  const setIsExpandedStyle = () => {
    setHeight('auto');
    setOverflow('visible');
    setVisibility('visible');
  };

  const setIsCollapsedStyle = () => {
    setVisibility('hidden');
  };

  const getHeight = () => `${content.current.scrollHeight}px`;

  useEffect(() => {
    if (isOpen) {
      if (isFirstRender) {
        setHeight('auto');
      } else {
        setHeight(getHeight());
      }
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
  }, [isOpen]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return {
    setIsExpandedStyle,
    setIsCollapsedStyle,
    style: {
      overflow,
      visibility,
      height,
    },
  };
};

export default useCollapse;
