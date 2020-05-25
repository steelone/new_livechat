

import { useRef, useEffect } from 'react';

/**
 * @function    useInterval
 * @description works like setInterval
 * @param {number} callback - your callback.
 * @param {number} delay - number
 * @returns {number} rounded number
 */

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


// EXAMPLE 
// useInterval(() => {
//   // Your custom logic here
//   setCount(count + 1);
// }, 1000);
