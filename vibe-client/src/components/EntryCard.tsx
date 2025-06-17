import { Entry } from "@/types/entry";
import { formatDateYMD } from "@/utils/dateFormatter";
import { getRandomFallbackImage } from "@/utils/findPlaceholderImg";
import { isSafeImageFilename } from "@/validation/imagePathValidation";

interface EntryCardProps {
  entry: Entry;
}

const EntryCard = ({ entry }: EntryCardProps) => {
  return (
    <article className="text-neutral-brand-900 p-3 md:p-5 w-full border-2 border-neutral-brand-900 rounded-lg mb-7">
      <div className="bg-blue-brand-500 aspect-square rounded-lg mb-2.5 md:mb-5">
        <img
          src={isSafeImageFilename(entry.cover_image) ? entry.cover_image : "/fallback1.png"}
          alt={entry.title}
          onError={(e) => {
            // If the image is not found, fallback to placeholder image
            const placeholder = getRandomFallbackImage();
            console.log(placeholder);
            e.currentTarget.src = placeholder;
          }}
          className="w-full object-cover aspect-square rounded-lg"
        />
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
