import Button from "./Button";
import InputGroup from "./InputGroup";
import { DialogTitle, DialogFooter, DialogHeader } from "./ui/dialog";

const EntryForm = () => {
  return (
    <form>
      <DialogHeader>
        <DialogTitle className="pb-4">Create new entry</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-scroll max-h-[70vh]">
        <div className="pt-5 pb-7 px-1">
          <InputGroup inputType="text" id="txtTitle" inputName="title" labelText="Title" />
          <InputGroup inputType="text" id="txtPlaylistLink" inputName="playlist_link" labelText="Playlist Link" />
          <InputGroup inputType="file" id="txtCoverImage" inputName="cover_image" labelText="Cover Image" />
          <InputGroup inputType="textarea" id="txtDescription" inputName="description" labelText="Description" />
          <div className="md:flex md:gap-2">
            <InputGroup inputType="date" id="txtStartDate" inputName="start_period" labelText="Start Date" />
            <InputGroup inputType="date" id="txtEndDate" inputName="end_period" labelText="End Date" />
          </div>
        </div>
      </div>
      <DialogFooter className="pt-6">
        <Button text="Create entry" type="submit" version="positive" />
      </DialogFooter>
    </form>
  );
};

export default EntryForm;
