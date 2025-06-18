import ApiClient from "@/services/api-client";
import { Entry } from "@/types/entry";

const apiClient = new ApiClient<Entry>("/entries");

export const useCreateEntry = () => {
    return async (entry: Omit<Entry, "entry_id">) => {
        try {
            const newEntry = await apiClient.post(entry);
            return newEntry;
        } catch (error) {
            console.error("Failed to create entry", error);
            throw error;
        }
    }
};