import React from 'react';
import { Entry } from "../types/entry"

interface EntryListItemProps {
    entry: Entry;
  }

const EntriesListItem: React.FC<EntryListItemProps> = ({ entry }) => {


  return (
    <li key={entry.entry_id}>
    <article className='flex justify-between'>
      <img src={entry.cover_image} alt={entry.title} className='bg-neutral-brand-150 w-19 h-19' />
      <h2>{entry.title}</h2>
      <p>{entry.start_period}</p>
    </article>
    </li>
  )
}

export default EntriesListItem;