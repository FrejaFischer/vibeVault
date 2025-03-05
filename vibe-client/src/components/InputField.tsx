interface Props {
  id: string;
  name: string;
  type: string;
}

const InputField = ({ id, name, type }: Props) => {
  return <input type={type} id={id} name={name} className="border-solid border-black border rounded-lg p-2 mt-2 md:p-3 md:text-xl lg:text-2xl focus:outline-primary focus:outline-2" />;
};

export default InputField;
