import LoopIcon from "./LoopIcon";
import AddIcon from "./AddIcon";
import SortIcon from "./SortIcon";

interface Props {
  icon: "loop" | "create" | "sort";
  text: string;
  onClick: () => void;
}

/**
 *
 * @param icon Which icon should used. Can be loop, create or sort
 * @param text Text for button
 * @param onClick Function triggered when clicked
 */
const IconButton = ({ icon, text, onClick }: Props) => {
  return (
    <button onClick={onClick} className=" bg-transparent hover:text-primary px-4 py-2 rounded-default text-black text-xl cursor-pointer flex gap-3 items-center md:text-2xl">
      {icon === "loop" && <LoopIcon />}
      {icon === "create" && <AddIcon />}
      {icon === "sort" && <SortIcon />}

      {text}
    </button>
  );
};

export default IconButton;
