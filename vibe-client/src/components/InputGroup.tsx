import InputField from "./InputField";

interface Props {
  labelText: string;
  id: string;
  inputName: string;
  inputType: string;
}

const InputGroup = ({ labelText, id, inputName, inputType }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="md:text-2xl">
        {labelText}
      </label>
      <InputField id={id} name={inputName} type={inputType} />
    </div>
  );
};

export default InputGroup;
