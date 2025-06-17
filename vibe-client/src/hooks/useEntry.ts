import { useEffect, useState } from "react";
import { Entry } from "../types/entry";
import ApiClient from "../services/api-client";

const apiClient = new ApiClient<Entry>("/entries");

type EntryResponse = {
  count: number;
  entry: Entry;
};

export const useEntry = (entry_id: number) => {
  const [entry, setEntry] = useState<Entry>(Object);
  //TODO: different object check
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEntry = async () => {
      try {
        const response = await apiClient.getById<EntryResponse>(entry_id);

        setEntry(response.entry);
      } catch (error) {
        setError(error as Error);

        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntry();
  }, [entry_id]);

  return { entry, isLoading, error };
};
