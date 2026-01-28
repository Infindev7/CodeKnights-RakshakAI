import { useState, useEffect, useMemo } from "react";
import { fetchCrimes } from "../services/api";

export default function useCrimeData(filters) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchCrimes(filters);
        setData(result);
      } catch (error) {
        console.error("Failed to load crime data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); // Empty dependency array = fetch once on mount (or depend on filters if using real API)

  // 2. Filter Data (Client Side Logic)
  const filteredData = useMemo(() => {
    return data.filter((crime) => {
      const typeMatch =
        filters.crimeType === "All" || crime.type === filters.crimeType;
      // Add more complex time logic here if needed
      return typeMatch;
    });
  }, [data, filters]);

  return { crimes: filteredData, loading };
}
