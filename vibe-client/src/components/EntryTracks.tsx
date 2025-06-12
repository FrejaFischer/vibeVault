import EntryTracksList from "./EntryTracksList";
import { useEntryTracks } from "@/hooks/useEntryTracks";

interface EntryTracksProps {
  entry_id: number;
}

const EntryTracks = ({ entry_id }: EntryTracksProps) => {
  const { tracks, isLoading, error } = useEntryTracks(entry_id);

  if (isLoading) return <p>Loading tracks...</p>;
  if (error) return <p>Error loading tracks: {error.message}</p>;
  return (
    <div>
      <EntryTracksList tracks={tracks} />
    </div>
  );
};

export default EntryTracks;
