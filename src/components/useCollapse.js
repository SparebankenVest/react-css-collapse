import { useEffect, useState } from 'react';

function getHeight(content) {
  if (content && content.current && content.current.scrollHeight) {
    return `${content.current.scrollHeight}px`;
  }
  return '0px';
}

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

  useEffect(() => {
    if (isOpen) {
      setVisibility('visible');
      if (isFirstRender) {
        setHeight('auto');
      } else {
        setHeight(getHeight(content));
      }
    } else {
      setHeight(getHeight(content));
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
