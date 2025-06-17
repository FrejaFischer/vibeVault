import { Entry } from "@/types/entry";
import { formatDateYMD } from "@/utils/dateFormatter";

interface EntryCardProps {
  entry: Entry;
}

const EntryCard = ({ entry }: EntryCardProps) => {
  return (
    <article className="text-neutral-brand-900 p-3 md:p-5 w-full border-2 border-neutral-brand-900 rounded-lg mb-7">
      <div className="bg-fuchsia-500 aspect-square rounded-lg mb-2.5 md:mb-5">
        <img src={entry.cover_image} alt="" className="w-full object-cover aspect-square rounded-lg" />
      </div>
      <p className="mb-5 md:mb-6">{entry.description}</p>
      <p className="text-xs md:text-base font-light">
        Time period:{" "}
        <span className="font-semibold">
          {formatDateYMD(entry.start_period)}
          {entry.end_period ? " - " + formatDateYMD(entry.end_period) : ""}
        </span>
      </p>
      <p className="text-xs md:text-base font-light">
        Entry created: <span className="font-semibold">{entry.created_at && formatDateYMD(entry.created_at)}</span>
      </p>
      <p className="text-xs md:text-base font-light">
        Length: <span className="font-semibold">{entry.trackcount} songs</span>
      </p>
    </article>
  );
};

export default EntryCard;
