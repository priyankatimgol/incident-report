import { useEffect, useRef } from 'react';

const generateId = (data) => data.reduce((acc, current) => Math.max(acc, current.ProductID), 0) + 1;

export const useCustomRef = (handler) => {
  let notifyRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return notifyRef;
};
