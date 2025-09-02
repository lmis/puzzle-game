"use client";

import React, { FC, useEffect, useState } from "react";

import cn from "classnames";

import { Location } from "@/client/components/locations/Location";
import { NavBar } from "@/client/components/nav/NavBar";
import { getGameStateToken, getSkipIntro } from "@/client/state/local-storage";
import { useTerminalState } from "@/client/state/terminal-state";
import { GameLocation } from "@/domain-model";
import { inexhaustive } from "@/lib/enum";
import { loadInitialTerminalItems } from "@/server/actions/load-terminal-items";

export const Game: FC = () => {
  const [gameLocations, setGameLocations] = useState<GameLocation[]>([]);
  const { enqueue } = useTerminalState();

  useEffect(() => {
    if (gameLocations.length === 0) {
      setGameLocations([
        getSkipIntro() ? GameLocation.ROOM : GameLocation.INTRODUCTION,
      ]);
    }
  }, [gameLocations, setGameLocations]);

  useEffect(() => {
    loadInitialTerminalItems(getGameStateToken()).then((items) =>
      enqueue(items),
    );
  }, [enqueue]);

  useEffect(() => {
    console.log(
      "%cHier müsst ihr nichts suchen. Alles was ihr braucht ist durch normales Interagieren mit dem Spiel erreichbar.",
      "font-size: 1rem; font-weight: bold;",
    );
  });

  const gameLocation =
    gameLocations[gameLocations.length - 1] ?? GameLocation.NONE;
  const onNavigation = (location: GameLocation) => {
    setGameLocations((prev) => [...prev, location]);
  };
  const onBack = () => {
    setGameLocations((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  return (
    <div className="relative flex size-full items-center justify-center">
      <div className="absolute inset-0 -z-40 bg-black" />
      <div
        className={cn(
          "absolute inset-0 -z-40 bg-cover bg-center bg-no-repeat blur-[100px]",
          getLocationBgClass(gameLocation),
        )}
      />
      <div
        className={cn(
          "absolute size-full -z-40 bg-auto opacity-100 transition-all duration-200 bg-no-repeat bg-center",
          getLocationBgClass(gameLocation),
        )}
      />
      <NavBar
        gameLocation={gameLocation}
        onNavigation={onNavigation}
        onBack={onBack}
      />
      <Location
        gameLocation={gameLocation}
        onNavigation={onNavigation}
        onBack={onBack}
      />
    </div>
  );
};

const getLocationBgClass = (location: GameLocation) => {
  switch (location) {
    case GameLocation.ASHTRAY:
      return "bg-[url(/ashtray.png)]";
    case GameLocation.COFFE_CUP:
      return "bg-[url(/coffee-cup.png)]";
    case GameLocation.BRIEFCASE:
      return "bg-[url(/briefcase.png)]";
    case GameLocation.TERMINAL:
      return "bg-[url(/terminal.png)]";
    case GameLocation.HELP:
      return "bg-[url(/wall.png)]";
    case GameLocation.INTRODUCTION:
    case GameLocation.ROOM:
    case GameLocation.NONE:
      return "bg-[url(/room.png)]";
    default:
      return inexhaustive(location);
  }
};
