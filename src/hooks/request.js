import { useState, useEffect } from 'react';

export const useRequest = (fetchFn) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFn().then((result) => {
      setData(result.data);
      setError(result.error);
      setLoading(false);
    });
  }, []);

  return { data, error, loading };
};
