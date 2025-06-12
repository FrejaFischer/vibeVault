import { Track } from "@/types/track";

interface EntryTracksListItemProps {
  track: Track;
}

const EntryTrackListItem: React.FC<EntryTracksListItemProps> = ({ track }) => {
  return <div>{track.name}</div>;
};

export default EntryTrackListItem;
