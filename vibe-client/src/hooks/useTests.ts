import { useEffect, useState } from "react";
import ApiClient, { Response } from "../services/api-client";
import { Test } from "../types/test";

// New instance of apiClient for calling our endpoint for fake data
const apiClient = new ApiClient<Test>("/test");

export const useTests = () => {
  const [testData, setTestData] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTests = async () => {
      try {
        // Getting all test from fake db / api endpoint
        const response: Response<Test> = await apiClient.getAll();

        // validation
        // Here there should be some validation of the data in the reponse - Sanitizing to avoid XSS

        // Storing the results of the response from API
        setTestData(response.results);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to load test data", err);
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, []);

  return { testData, loading, error };
};
