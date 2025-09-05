"use client";

import React, { FC, useEffect } from "react";

import { AnimatedOutput } from "@/client/components/locations/terminal/AnimatedOutput";
import { useTerminalState } from "@/client/state/terminal-state";

export const DesktopDisplay: FC = () => {
  const { handleKeypress, submitLastInput } = useTerminalState();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKeypress(event.key);
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeypress, submitLastInput]);

  return (
    <div className="text-shadow-glow-green animate-flicker relative size-full overflow-hidden rounded-[4rem] border-[16px] border-black bg-neutral-800 font-mono text-green-400">
      <section className="h-full px-10">
        <AnimatedOutput lineWidth={60} />
      </section>
      <div
        className="pointer-events-none absolute inset-0 z-40"
        aria-hidden="true"
      >
        <div className="relative size-full">
          <div className="bg-repeating-scanlines animate-move-bg-y-linear absolute inset-0 opacity-5" />
          <div className="bg-dome absolute inset-0 block" />
          <div className="bg-noise animate-move-bg-steps absolute inset-0 opacity-40 mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
};

export const MobileDisplay: FC = () => {
  const { setUserInput, handleKeypress, acceptsInput } = useTerminalState();
  return (
    <div className="text-shadow-glow-green animate-flicker relative flex size-full flex-col justify-between overflow-hidden bg-neutral-800 font-mono text-green-400 ">
      <section className="h-10/12 px-4">
        <AnimatedOutput lineWidth={28} />
      </section>
      <div
        className="pointer-events-none absolute inset-0 z-40"
        aria-hidden="true"
      >
        <div className="relative size-full">
          <div className="bg-repeating-scanlines animate-move-bg-y-linear absolute inset-0 opacity-5" />
          <div className="bg-noise animate-move-bg-steps absolute inset-0 opacity-40 mix-blend-overlay" />
        </div>
      </div>
      {acceptsInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleKeypress("Enter");
          }}
        >
          <input
            className="h-4 w-[98%] bg-transparent p-8 outline-none"
            type="text"
            placeholder="[Hier tippen]"
            onChange={(e) => {
              if (e.target.value.includes("\n")) {
                handleKeypress("Enter");
              } else {
                setUserInput(e.target.value);
              }
            }}
          />
        </form>
      )}
    </div>
  );
};
