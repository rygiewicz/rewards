import { useState, useEffect } from 'react';

export const useRequest = (fetchFn) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function doFetch() {
    fetchFn().then((result) => {
      setData(result.data);
      setError(result.error);
      setLoading(false);
    });
  }

  useEffect(doFetch, [fetchFn]);

  return { data, error, loading, retry: doFetch };
};
