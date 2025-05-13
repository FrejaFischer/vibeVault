import ApiClient from "../services/api-client";
import { Test } from "../types/test";

// New instance of apiClient for calling our endpoint for creating new test data
const apiClient = new ApiClient<Test>("/test");

// Function which returns a method, that accepts Test data (except the id) and sends POST request to API
export const useCreateTest = () => {
  return async (test: Omit<Test, "id">) => {
    try {
      const newTest = await apiClient.post(test);
      return newTest;
    } catch (error) {
      console.error("Failed to create test user", error);
      throw error;
    }
  };
};
