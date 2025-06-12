import EntryCard from "@/components/EntryCard";
import EntryTracks from "@/components/EntryTracks";
import { useEntry } from "@/hooks/useEntry";

import { useParams } from "react-router";

const EntryPage = () => {
  const { id } = useParams();
  const { entry, error, isLoading } = useEntry(Number(id));

  if (error) {
    return <p>Error getting Entry</p>;
  }
  console.log(entry);

  return (
    <section>
      {isLoading ? (
        <p className="m-auto">Loading...</p>
      ) : (
        <>
          <EntryCard />
          <EntryTracks tracks={entry.tracks} />
        </>
      )}
    </section>
  );
};

export default EntryPage;
