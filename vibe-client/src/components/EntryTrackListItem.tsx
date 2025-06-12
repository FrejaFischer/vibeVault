import { Track } from "@/types/track";

interface EntryTracksListItemProps {
  track: Track;
  number: number;
}

const EntryTrackListItem: React.FC<EntryTracksListItemProps> = ({ track, number }) => {
  return (
    <li className="w-full">
      <article className="w-full flex gap-5 items-center md:gap-10">
        <p>{number}</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-2 w-full">
          <h3 className="text-lg text-ellipsis line-clamp-1 md:text-2xl row-start-1 cols-start-1 col-span-2 md:col-span-1 row-span-1 md:mr-auto">{track.name}</h3>
          <p className="text-neutral-brand-700 text-sm md:text-lg text-ellipsis line-clamp-1 row-start-2 col-start-1 col-span-1 row-span-1 md:mr-auto">{track.album?.artist?.name}</p>
          <p className="text-neutral-brand-700 text-sm md:text-lg text-ellipsis line-clamp-1 row-start-2 col-start-2 md:row-start-1 col-span-1 row-span-2 md:my-auto md:ml-auto">
            {track.album?.title}
          </p>
        </div>
        <p className="">x</p>
      </article>
    </li>
  );
};

export default EntryTrackListItem;
