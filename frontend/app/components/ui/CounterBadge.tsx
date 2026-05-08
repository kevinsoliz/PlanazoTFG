interface Props {
  value: number;
  accent: string;
}

const CounterBadge = ({ value, accent }: Props) => {
  return (
    <span
      className="px-3 py-1 border-2 border-neutral rounded-md font-bold text-sm"
      style={{
        backgroundColor: accent,
        boxShadow: "2px 2px 0 var(--color-neutral)",
      }}
    >
      {value}
    </span>
  );
};

export default CounterBadge;
