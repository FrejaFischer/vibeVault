import { Track } from "@/types/track";
import EntryTrackListItem from "./EntryTrackListItem";

interface EntryTracksListProps {
  tracks: Track[];
}

const EntryTracksList = ({ tracks }: EntryTracksListProps) => {
  return (
    <ul className="flex flex-col gap-6">
      {tracks.map((track, index) => (
        <EntryTrackListItem key={track.track_id} track={track} number={index + 1} />
      ))}
    </ul>
  );
};

export default EntryTracksList;
