import { useEffect, useState } from "react";
import ApiClient, { Response } from "../services/api-client";
import { Album } from "../types/album"; // The type of an album

// New instance of apiClient for calling our endpoint for albums
const apiClient = new ApiClient<Album>("/albums");

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]); // Expect albums to be an array of Album
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        // Getting all albums from api endpoint. Expect reponse to be of type Album
        const response: Response<Album> = await apiClient.getAll();

        // Storing the results of the response from API
        setAlbums(response.results);
      } catch (err) {
        // set the error for components to see
        setError(err as Error);
        // log the error
        console.error("Failed to load album data", err);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  return { albums, loading, error };
};
