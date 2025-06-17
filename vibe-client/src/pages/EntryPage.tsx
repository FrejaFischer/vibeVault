import Button from "@/components/Button";
import EntryCard from "@/components/EntryCard";
import EntryTracks from "@/components/EntryTracks";
import { useEntry } from "@/hooks/useEntry";
import { Plus, SquarePen, ExternalLink } from "lucide-react";

import { useParams } from "react-router";

const EntryPage = () => {
  const { id } = useParams();
  const { entry, error, isLoading } = useEntry(Number(id));

  if (isLoading) return <p className="m-auto">Loading entry...</p>;
  if (error) return <p className="m-auto">Error getting Entry</p>;

  return (
    <section className="md:mt-10 md:grid md:grid-cols-3 md:gap-8">
      <div className="col-span-2 flex items-center">
        <h1>{entry.title}</h1>
        {entry.playlist_link && (
          <a href={entry.playlist_link} className="ml-auto">
            <ExternalLink />
          </a>
        )}
      </div>
      <div className="col-start-1 row-start-1 row-span-3">
        <EntryCard entry={entry} />
      </div>
      <div className="flex flex-col col-span-2 gap-2.5 md:flex-row md:gap-4 mb-7 md:mb-0">
        <Button text="Edit entry" className="h-fit w-full md:w-fit" version="ghost" icon={<SquarePen />} />
        <Button text="Add song" className="h-fit w-full md:w-fit" icon={<Plus />} />
      </div>
      <div className="col-span-2">
        <EntryTracks entry_id={Number(entry.entry_id)} />
      </div>
    </section>
  );
};

export default EntryPage;
