import React, { FC } from "react";

interface Props {
  label: string;
  onClick: () => void;
  symbol: string;
}

export const NavButton: FC<Props> = ({ label, onClick, symbol }) => (
  <button
    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-cyan-300 text-xl font-bold text-gray-900 transition hover:bg-cyan-400"
    aria-label={label}
    onClick={onClick}
  >
    {symbol}
  </button>
);
