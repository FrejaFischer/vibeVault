import ApiClient from "../services/api-client";
import { User } from "../types/user";

// New instance of apiClient for calling our POST endpoint for new user
const apiClient = new ApiClient<User>("/users");

// Function which returns a method, that accepts user data (except the id) and sends POST request to API
export const useCreateUser = () => {
  return async (user: Omit<User, "user_id">) => {
    try {
      const newTest = await apiClient.post(user);
      return newTest;
    } catch (error) {
      console.error("Failed to create user", error);
      throw error;
    }
  };
};
