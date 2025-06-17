import { useEffect, useState } from "react";
import { Entry } from "../types/entry";
import ApiClient, { Response } from "../services/api-client";

const apiClient = new ApiClient<Entry>("/entries");

export const useEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response: Response<Entry> = await apiClient.getAll();

        setEntries(response.results);
      } catch (error) {
        setError(error as Error);

        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  return { entries, isLoading, error };
};
