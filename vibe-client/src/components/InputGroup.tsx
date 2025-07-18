import InputField from "./InputField";
import InputTextArea from "./InputTextArea";

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
    <div className="flex flex-col w-full mb-4">
      <label htmlFor={id} className=" text-neutral-brand-700 md:text-lg">
        {labelText}
      </label>
      {inputType === "textarea" ? (
        <InputTextArea id={id} name={inputName} value={value} onChange={onChange} />
      ) : (
        <InputField id={id} name={inputName} type={inputType} value={value} onChange={onChange} />
      )}
      {errors && errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="text-negative-brand-400">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputGroup;
