import { useEffect, useState } from "react";
import { Track } from "../types/track";
import ApiClient from "../services/api-client";

interface EntryTracksResponse {
    count: number;
    entry_id: number;
    tracks: Track[];
}

const apiClient = new ApiClient<EntryTracksResponse>("/entries");

export const useEntryTracks = (entry_id: number) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const response = await apiClient.getById<EntryTracksResponse>(`${entry_id}/tracks`);
                setTracks(response.tracks);
            } catch (error) {
                setError(error as Error);
                console.error("Failed to load tracks", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTracks();
    }, [entry_id]);

    return { tracks, isLoading, error };
};
