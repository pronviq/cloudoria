import React, { useState } from "react";

const useFetching = async (callback: Function) => {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const fn = async (...args: any) => {
    try {
      setLoaded(false);
      await callback(...args);
    } catch (error: any) {
      setError(error.message);
      setLoaded(true);
    } finally {
      setLoaded(true);
    }
  };

  return [fn, error, isLoaded] as any[];
};

export default useFetching;
