import { useEntry } from "@/hooks/useEntry";

import { useParams } from "react-router";

const EntryPage = () => {
  const { id } = useParams();
  const { entry, error, isLoading } = useEntry(Number(id));

  if (error) {
    return <p>Error getting errors</p>;
  }
  console.log(entry);

  return <section>{isLoading ? <p className="m-auto">Loading...</p> : <h1>{entry.title}</h1>}</section>;
};

export default EntryPage;
