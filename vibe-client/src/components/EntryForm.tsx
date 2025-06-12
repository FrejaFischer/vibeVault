import Button from "./Button";
import InputGroup from "./InputGroup";
import { DialogTitle, DialogFooter, DialogHeader } from "./ui/dialog";

const EntryForm = () => {
  return (
    <form>
      <DialogHeader>
        <DialogTitle>Create new entry</DialogTitle>
      </DialogHeader>
      <div className="pt-5 pb-7">
        <InputGroup inputType="text" id="txtTitle" inputName="title" labelText="Title" />
      </div>
      <DialogFooter>
        <Button text="Create entry" type="submit" version="positive" />
      </DialogFooter>
    </form>
  );
};

export default EntryForm;
