import { useState, useEffect } from "react";

interface FetchingResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

function useFetching<T>(asyncFunction: () => Promise<T>): FetchingResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    asyncFunction()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [asyncFunction]);

  return { data, error, isLoading };
}

export default useFetching;
