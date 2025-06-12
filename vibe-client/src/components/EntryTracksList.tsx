import { Track } from "@/types/track";
import EntryTrackListItem from "./EntryTrackListItem";

interface EntryTracksListProps {
  tracks: Track[];
}

const EntryTracksList = ({ tracks }: EntryTracksListProps) => {
  return (
    <ul>
      {tracks.map((track) => (
        <EntryTrackListItem key={track.track_id} track={track} />
      ))}
    </ul>
  );
};

export default EntryTracksList;
