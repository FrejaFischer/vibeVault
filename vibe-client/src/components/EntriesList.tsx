import { useEntries } from "../hooks/useEntries";
import EntriesListItem from "./EntriesListItem";

interface Props {
  className?: string;
}

const EntriesList = ({ className }: Props) => {
  const { entries, error, isLoading } = useEntries();

  if (error) {
    return <p>Error getting errors</p>;
  }

  return (
    <article className={className}>
      {isLoading ? (
        <p className="m-auto">Loading...</p>
      ) : entries.length < 1 ? (
        <p className="m-auto">No entries</p>
      ) : (
        <ul className="flex flex-col gap-6 md:gap-8">
          {entries.map((entry) => (
            <EntriesListItem entry={entry} key={entry.entry_id} />
          ))}
        </ul>
      )}
    </article>
  );
};

export default EntriesList;
