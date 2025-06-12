import Button from "@/components/Button";
import EntryCard from "@/components/EntryCard";
import EntryTracks from "@/components/EntryTracks";
import { useEntry } from "@/hooks/useEntry";
import { Plus, SquarePen } from "lucide-react";

import { useParams } from "react-router";

const EntryPage = () => {
  const { id } = useParams();
  const { entry, error, isLoading } = useEntry(Number(id));

  if (isLoading) return <p className="m-auto">Loading tracks...</p>;
  if (error) return <p className="m-auto">Error getting Entry</p>;

  console.log(entry);

  return (
    <section className="md:grid md:grid-cols-3 md:gap-8">
      <div className="col-span-2 flex items-center">
        <h1>{entry.title}</h1>
        <div className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
          </svg>
        </div>
      </div>
      <div className="col-start-1 row-start-1 row-span-3">
        <EntryCard />
      </div>
      <div className="flex flex-col col-span-2 gap-2.5 md:flex-row md:gap-4">
        <Button text="Edit entry" className="h-fit w-full md:w-fit" version="ghost" icon={<SquarePen />} />
        <Button text="Create playlist" className="h-fit w-full md:w-fit" icon={<Plus />} />
      </div>
      <div className="col-span-2">
        <EntryTracks entry_id={Number(entry.entry_id)} />
      </div>
    </section>
  );
};

export default EntryPage;
