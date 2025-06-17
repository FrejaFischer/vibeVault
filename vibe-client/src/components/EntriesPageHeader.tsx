import Button from "./Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Search, Plus } from "lucide-react";
import { Input } from "./ui/input";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EntryForm from "./EntryForm";

interface Props {
  className?: string;
  setSearchTerm: (term: string) => void;
}

const EntriesPageHeader = ({ className, setSearchTerm }: Props) => {
  return (
    <div className={"flex items-center gap-x-3" + " " + className}>
      <h1>Your vibeVault</h1>
      <Dialog>
        <DialogTrigger>
          <Button text="Create playlist" className="h-fit" icon={<Plus />} />
        </DialogTrigger>
        <DialogContent>
          <EntryForm />
        </DialogContent>
      </Dialog>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alph">Alphabetical</SelectItem>
          <SelectItem value="period">Time period</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EntriesPageHeader;
