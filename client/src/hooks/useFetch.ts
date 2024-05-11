import { useEffect, useState } from "react";
import { $host } from "../service/api";
import { IProduct } from "../models/IProduct";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await $host.get(url);
        setData(res.data);
      } catch (e) {
        setError(true);
        console.log(e);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
