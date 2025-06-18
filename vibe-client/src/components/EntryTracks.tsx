import EntryTracksList from "./EntryTracksList";
import { useEntryTracks } from "@/hooks/useEntryTracks";

interface EntryTracksProps {
  entry_id: number;
}

const EntryTracks = ({ entry_id }: EntryTracksProps) => {
  const { tracks, isLoading, error } = useEntryTracks(entry_id);

  if (isLoading) return <p>Loading tracks...</p>;
  if (error) return <p>Error loading tracks: {error.message}</p>;
  if (!tracks || tracks.length === 0) return <p className="pb-1.5 md:min-h-[300px]">No tracks found for this entry.</p>;
  return (
    <div className="md:min-h-[300px]">
      <EntryTracksList tracks={tracks} />
    </div>
  );
};

export default EntryTracks;
