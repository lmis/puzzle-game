"use client";

import React, { FC } from "react";

import clsx from "clsx";

import { NavButton } from "@/client/components/nav/NavButton";
import { useGameState } from "@/client/state/game-state";
import { useTerminalState } from "@/client/state/terminal-state";
import { GameLocation } from "@/domain-model";

interface Props {
  className: string;
}

export const NavBar: FC<Props> = ({ className }) => {
  const { scroll } = useTerminalState();
  const { back, navigate, gameLocation } = useGameState();
  const showHelp = ![
    GameLocation.NONE,
    GameLocation.HELP,
    GameLocation.LEGAL_NOTICE,
    GameLocation.GAME_RULES,
    GameLocation.HEALTH_WARNING_AND_PRIVACY,
    GameLocation.PROLOGUE,
  ].includes(gameLocation);
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      {showHelp && (
        <NavButton
          label="hilfe"
          onClick={() => navigate(GameLocation.HELP)}
          symbol="?"
        />
      )}
      {gameLocation !== GameLocation.HEALTH_WARNING_AND_PRIVACY && (
        <NavButton label="zurück" onClick={back} symbol="⬅" />
      )}
      {gameLocation === GameLocation.TERMINAL && (
        <>
          <NavButton
            label="nach-oben"
            onClick={() => scroll(-5)}
            symbol="⬆"
            holdable
          />
          <NavButton
            label="nach-unten"
            onClick={() => scroll(5)}
            symbol="⬇"
            holdable
          />
        </>
      )}
    </div>
  );
};
