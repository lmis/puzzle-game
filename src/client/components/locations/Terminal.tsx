"use client";

import React, { FC, useEffect, useRef } from "react";

import { useTerminalState } from "@/client/state/terminal-state";
import { isCongratulations } from "@/domain-model";

export const Terminal: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    userInput,
    queue,
    display,
    acceptKeypress,
    startAnimation,
    submitLastInput,
  } = useTerminalState();
  const lastDisplayItem = display[display.length - 1];
  const shouldAcceptInput =
    queue.length === 0 &&
    !lastDisplayItem?.input &&
    !isCongratulations(lastDisplayItem);

  useEffect(() => {
    startAnimation();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight;
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      acceptKeypress(event.key);

      if (event.key === "Enter") {
        submitLastInput();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [acceptKeypress, submitLastInput]);

  return (
    <div className="w-full] size-full lg:h-[660px] lg:w-[825px] lg:translate-x-[-2px] lg:translate-y-[-65px]">
      <div className="text-shadow-glow-green shadow-gray-glow-solid-black animate-flicker relative size-full overflow-hidden bg-neutral-800 font-mono text-green-400 lg:rounded-[7rem]">
        <section className="h-full px-4 lg:px-10">
          <div
            ref={containerRef}
            className="flex h-full flex-col overflow-y-hidden"
          >
            <div className="flex-1">
              <div className="p-4 lg:p-8" />
              {display.map(({ key, content, input }) => (
                <div className="whitespace-pre" key={key}>
                  {input && "> "}
                  {content}
                </div>
              ))}
              {shouldAcceptInput && (
                <span>
                  {"> "}
                  {userInput}
                  <div className="animate-blink inline-block h-5 w-2 pl-1 align-bottom">
                    _{" "}
                  </div>
                </span>
              )}
              <div className="p-4 lg:p-8" />
            </div>
            <input
              type="text"
              value={userInput ?? ""}
              placeholder="[Keyboard öffnen]"
              name="terminal-input"
              onChange={() => {}}
              className="z-50 w-full rounded-2xl bg-gray-900 p-4 text-center outline-none lg:hidden"
            />
          </div>
        </section>
        <div
          className="pointer-events-none absolute inset-0 z-40"
          aria-hidden="true"
        >
          <div className="relative size-full">
            <div className="bg-repeating-scanlines animate-move-bg-y-linear absolute inset-0 opacity-5" />
            <div className="bg-dome absolute inset-0 hidden lg:block" />
            <div className="bg-noise animate-move-bg-steps absolute inset-0 opacity-40 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
};
