import { useState } from "react";
import EntriesList from "../components/EntriesList";
import EntriesPageHeader from "../components/EntriesPageHeader";
import EntriesProfileCard from "../components/EntriesProfileCard";

const EntriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-8">
        <EntriesPageHeader className="col-span-3" setSearchTerm={setSearchTerm} />
        <EntriesProfileCard className="col-span-1" />
        <EntriesList className="col-span-2" search={searchTerm} />
      </div>
    </>
  );
};

export default EntriesPage;
