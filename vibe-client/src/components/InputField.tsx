interface Props {
  id: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ id, name, type, value, onChange }: Props) => {
  if (type === "file") {
    return (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        accept="image/*"
        className="text-neutral-brand-100 bg-neutral-brand-900 rounded-lg p-2 mt-2 md:p-3 md:text-xl lg:text-2xl focus:outline-positive-brand-200 focus:outline-2 w-fit max-w-72"
      />
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={
        "bg-neutral-brand-150 border-solid border-black border rounded-lg p-2 mt-2 md:p-3 md:text-xl lg:text-2xl focus:outline-positive-brand-200 focus:outline-2" + (type === "file" && " text-")
      }
    />
  );
};

export default InputField;
