import { notFound } from "next/navigation";

const PlaygroundsLayout = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <>{children}</>;
};

export default PlaygroundsLayout;
