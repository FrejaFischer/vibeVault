import { Track } from "@/types/track";
import EntryTracksList from "./EntryTracksList";

interface EntryTracksProps {
  tracks: Track[];
}

const EntryTracks: React.FC<EntryTracksProps> = ({ tracks }) => {
  return (
    <div>
      <EntryTracksList tracks={tracks} />
    </div>
  );
};

export default EntryTracks;
