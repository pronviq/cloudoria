import { useRef } from "react";

const useDebounce = (delay: number, callback: Function) => {
  let timeout = useRef<NodeJS.Timeout>();

  return function (...args: any) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      callback(args);
    }, delay);
  };
};

export default useDebounce;
