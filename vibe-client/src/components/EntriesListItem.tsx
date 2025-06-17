import React from "react";
import { Entry } from "../types/entry";
import { NavLink } from "react-router";
import { isSafeImageFilename } from "@/validation/imagePathValidation";
import { getRandomFallbackImage } from "@/utils/findPlaceholderImg";
import { formatDateYM } from "@/utils/dateFormatter";

interface EntryListItemProps {
  entry: Entry;
}

const EntriesListItem: React.FC<EntryListItemProps> = ({ entry }) => {
  return (
    <li>
      <NavLink to={`/entries/${entry.entry_id}`}>
        <article className="flex gap-7 items-center w-full">
          <div className="bg-blue-brand-100 w-15 rounded-lg aspect-square md:w-19 md:h-19">
            <img
              src={isSafeImageFilename(entry.cover_image) ? entry.cover_image : "/fallback1.png"}
              alt={entry.title}
              onError={(e) => {
                // If the image is not found, fallback to placeholder image
                const placeholder = getRandomFallbackImage();
                e.currentTarget.src = placeholder;
              }}
              className="w-full object-cover aspect-square"
            />
          </div>
          <div className="flex flex-col md:items-center w-full justify-between md:flex-row">
            <h2 className="text-xl md:text-2xl">{entry.title}</h2>
            <div className="flex items-center justify-between w-full text-base md:text-lg text-neutral-brand-700 md:max-w-50">
              <p className="uppercase">{formatDateYM(entry.start_period)}</p>
              <p>{entry.trackcount}</p>
            </div>
          </div>
        </article>
      </NavLink>
    </li>
  );
};

export default EntriesListItem;
