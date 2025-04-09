import { useEntries } from "../hooks/useEntries";

const EntriesList = () => {
  const { entries, loading, error } = useEntries();

  if (loading) return <p>Loading entries...</p>;
  if (error) return <p>Error loading entries: {error.message}</p>;

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.entry_pk}>
          {entry.entry_title} ({entry.entry_description})
        </li>
      ))}
    </ul>
  );
};

export default EntriesList;
