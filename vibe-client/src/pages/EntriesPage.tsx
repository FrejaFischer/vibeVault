import EntriesList from "../components/EntriesList";
import EntriesPageHeader from "../components/EntriesPageHeader";
import EntriesProfileCard from "../components/EntriesProfileCard";

const EntriesPage = () => {
  return (
    <>
      <EntriesPageHeader/>
      <div className="grid grid-cols-3">
      <EntriesProfileCard className="span-1"/>
      <EntriesList className="span-2"/>
      </div>
    </>
  );
};

export default EntriesPage;
