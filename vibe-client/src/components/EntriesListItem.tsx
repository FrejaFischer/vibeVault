import React from "react";
import { Entry } from "../types/entry";
import { NavLink } from "react-router";
import { formatDateYM } from "@/utils/dateFormatter";

interface EntryListItemProps {
  entry: Entry;
}

const EntriesListItem: React.FC<EntryListItemProps> = ({ entry }) => {
  return (
    <li key={entry.entry_id}>
      <NavLink to={`/entries/${entry.entry_id}`}>
        <article className="flex gap-7 items-center w-full">
          <div className="bg-neutral-brand-150 w-15 rounded-lg aspect-square md:w-19 md:h-19">
            <img src={entry.cover_image} alt={entry.title} className="w-full object-cover aspect-square" />
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
