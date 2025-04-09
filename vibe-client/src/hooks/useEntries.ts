import { useEffect, useState } from "react";
import ApiClient, { Response } from "../services/api-client";
import { Data } from "../data/mockup_data"; // Data type for the fake data

// Calling our fake endpoint for fake data
const apiClient = new ApiClient<Data>("/entries");

export const useEntries = () => {
  const [entries, setEntries] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // useEffect is to be replaced with React query (if we choose to use it)
  useEffect(() => {
    const loadEntries = async () => {
      try {
        // Getting all entries from fake data
        const response: Response<Data> = await apiClient.getAll();
        // Storing the data
        setEntries(response.results);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to load entries", err);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  return { entries, loading, error };
};
