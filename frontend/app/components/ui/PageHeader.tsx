interface Props {
  title: string;
  subtitle?: string;
  top?: string;
}

const PageHeader = ({ title, subtitle, top = "top-21" }: Props) => {
  return (
    <header className={`flex flex-col gap-2 border-2 rounded-md px-4 py-4 lg:sticky lg:${top} z-10 backdrop-blur-md bg-base-100/40 shadow-md`}>
      <h1 className="font-(family-name:--font-bagel-fat-one) text-4xl md:text-5xl text-neutral leading-none">
        {title}
      </h1>
      {subtitle && (
        <p className="text-neutral/70 text-base md:text-md">{subtitle}</p>
      )}
    </header>
  );
};

export default PageHeader;
