interface Props {
  id: string;
  name: string;
  type: string;
}

const InputField = ({ id, name, type }: Props) => {
  return <input type={type} id={id} name={name} className="w-52 border-solid border-black border rounded-lg p-2 mt-2 md:w-xs md:p-3 md:text-xl lg:text-2xl focus:outline-primary focus:outline-2" />;
};

export default InputField;
