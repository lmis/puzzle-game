import React, { FC } from "react";

import cn from "classnames";

interface Props {
  onClick: () => void;
  className: string;
}

export const MagnifyingGlass: FC<Props> = ({ onClick, className }) => (
  <div
    className={cn(
      "absolute size-9 rounded-full bg-transparent border-2 border-cyan-300 shadow-cyan-glow hover:shadow-cyan-glow-hover cursor-pointer transition-shadow scale-100 hover:scale-110",
      className,
    )}
    onClick={onClick}
  >
    <div className="absolute top-[70%] left-[110%] h-full w-[20%] transform-[rotate(-45deg)]">
      <div className="shadow-cyan-glow hover:shadow-cyan-glow-hover absolute inset-0 top-[55%] rounded-b-full bg-transparent transition-shadow" />
      <div className="absolute inset-0 rounded-b-full bg-black" />
    </div>
  </div>
);
