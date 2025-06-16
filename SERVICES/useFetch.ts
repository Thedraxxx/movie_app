//custom hooks

import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => { //ts ko generic type ho, fetchFunction le promise return garxa ani autoFetch true xa vane useEffect ma call garxa
  // useFetch custom hook to handle data fetching, loading state, and error handling
  const [data, setData] = useState<T | null>(null); //api bata aana data lai store garna useState ma T type ko data rakhxa, initial value null hunxa
  const [loading, setLoading] = useState(false); //while fetching data, state true hunxa nava false
  const [error, setError] = useState<Error | null>(null); // fetch garda error aayo vana yesma store hunca

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => { // useEffect le component mount(first time show garda) hune bela ma fetchData call garxa
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;