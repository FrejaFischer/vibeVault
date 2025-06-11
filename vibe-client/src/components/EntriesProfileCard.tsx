interface Props {
  className?: string;
}

const EntriesProfileCard = ({ className }: Props) => {
  return (
    <div className={className}>
      <article className="w-full border-2 border-neutral-brand-900 rounded-lg">EntriesProfileCard</article>
    </div>
  );
};

export default EntriesProfileCard;
