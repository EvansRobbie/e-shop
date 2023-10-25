import { FC } from "react";

interface HeadingProps {
  title: string;
  center?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default Heading;
