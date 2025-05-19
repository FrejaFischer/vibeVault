import InputField from "./InputField";

interface Props {
  labelText: string;
  id: string;
  inputName: string;
  inputType: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
}

const InputGroup = ({ labelText, id, inputName, inputType, value, onChange, errors }: Props) => {
  return (
    <div className="flex flex-col w-52 md:w-xs">
      <label htmlFor={id} className="md:text-2xl">
        {labelText}
      </label>
      <InputField id={id} name={inputName} type={inputType} value={value} onChange={onChange} />
      {errors && errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputGroup;
