import React, { FC, PropsWithChildren } from "react";

interface Props {
  onAccept?: () => void;
  ariaLabel: string;
  title: string;
  confirmText: string;
}

export const TextDisplay: FC<PropsWithChildren<Props>> = ({
  onAccept,
  ariaLabel,
  title,
  confirmText,
  children,
}) => (
  <div className="relative z-10 max-w-240 rounded-lg bg-slate-900 p-8 text-gray-500 opacity-95 shadow-lg">
    <h1 className="mb-2 text-2xl font-bold">{title}</h1>
    <div className="flex flex-col gap-2">{children}</div>
    {onAccept && (
      <button
        onClick={onAccept}
        className="mt-4 rounded bg-cyan-300 px-4 py-2 font-bold text-gray-900 hover:bg-cyan-400"
        aria-label={ariaLabel}
      >
        {confirmText}
      </button>
    )}
  </div>
);
