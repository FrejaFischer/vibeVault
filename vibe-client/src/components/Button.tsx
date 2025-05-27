interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  version?: "primary" | "ghost" | "positive" | "negative" | "positive-ghost" | "negative-ghost";
  className?: string;
  icon?: React.ReactNode;
}

const versionClassMap: Record<NonNullable<ButtonProps["version"]>, string> = {
  primary: "bg-neutral-brand-900 text-neutral-brand-150 border-2 border-transparent",
  positive: "bg-positive-brand-400 text-neutral-brand-150 border-2 border-transparent",
  negative: "bg-negative-brand-400 text-neutral-brand-150 border-2 border-transparent",
  ghost: "bg-neutral-brand-150 text-neutral-brand-900 border-2 border-neutral-brand-900",
  "positive-ghost": "bg-neutral-brand-150 text-positive-brand-400 border-2 border-positive-brand-400",
  "negative-ghost": "bg-neutral-brand-150 text-negative-brand-400 border-2 border-negative-brand-400",
};

const Button = ({ type = "button", version = "primary", text, className, icon }: ButtonProps) => {
  return (
    <button type={type} className={`btn rounded-lg px-4 py-2 text-xl font-bold cursor-pointer capitalize flex items-center ${versionClassMap[version] || ""} ${className}`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
