interface Props {
  styling?: string;
}

const VinylsGraphic = ({ styling }: Props) => {
  return (
    <div className={`relative w-[250px] h-[210px] sm:w-[350px] sm:h-[325px] lg:w-[510px] lg:h-[450px] ${styling}`}>
      <svg viewBox="0 0 310 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[150px] h-[150px] sm:w-[225px] sm:h-[225px] lg:w-[310px] lg:h-[310px] text-primary absolute bottom-0 right-0">
        <circle cx="155" cy="155" r="150" stroke="currentColor" stroke-width="5" />
        <circle cx="155" cy="155" r="135" fill="currentColor" />
        <circle cx="155" cy="155" r="120" fill="#fff" stroke="currentColor" stroke-width="3" />
        <circle cx="155" cy="155" r="105" fill="currentColor" />
        <circle cx="155" cy="155" r="90" fill="#fff" stroke="currentColor" stroke-width="3" />
        <circle cx="155" cy="155" r="75" fill="currentColor" />
        <circle cx="155" cy="155" r="60" fill="#fff" stroke="currentColor" stroke-width="3" />
        <circle cx="155" cy="155" r="30" fill="currentColor" />
        <circle cx="155" cy="155" r="5" fill="#fff" />
      </svg>
      <svg viewBox="0 0 310 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[150px] h-[150px] sm:w-[225px] sm:h-[225px] lg:w-[310px] lg:h-[310px] text-black">
        <circle cx="155" cy="155" r="150" stroke="currentColor" stroke-width="5" />
        <circle cx="155" cy="155" r="135" fill="currentColor" />
        <circle cx="155" cy="155" r="120" fill="#fff" stroke="currentColor" stroke-width="3" />
        <circle cx="155" cy="155" r="105" fill="currentColor" />
        <circle cx="155" cy="155" r="90" fill="#fff" stroke="currentColor" stroke-width="3" />
        <circle cx="155" cy="155" r="75" fill="currentColor" />
        <circle cx="155" cy="155" r="60" fill="#fff" stroke="currentColor" stroke-width="3" />
        <circle cx="155" cy="155" r="30" fill="currentColor" />
        <circle cx="155" cy="155" r="5" fill="#fff" />
      </svg>
    </div>
  );
};

export default VinylsGraphic;
