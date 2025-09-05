"use client";

import React, { FC, useEffect, useState } from "react";

import { Locations } from "@/client/components/locations/Locations";
import { NavBar } from "@/client/components/nav/NavBar";
import { getLocationImageUrl } from "@/client/location-images";
import { useGameState } from "@/client/state/game-state";
import { getGameStateToken, getSkipIntro } from "@/client/state/local-storage";
import { useTerminalState } from "@/client/state/terminal-state";
import { GameLocation } from "@/domain-model";
import { loadInitialTerminalItems } from "@/server/actions/load-terminal-items";

export const Game: FC = () => {
  const { gameLocation, navigate } = useGameState();
  const { enqueue, setSkipAnimation } = useTerminalState();
  const [displayedImageUrl, setDisplayedImageUrl] = useState(
    getLocationImageUrl(gameLocation),
  );

  useEffect(() => {
    if (gameLocation === GameLocation.NONE) {
      navigate(
        getSkipIntro()
          ? GameLocation.SAFEHOUSE
          : GameLocation.HEALTH_WARNING_AND_PRIVACY,
      );
    }
  }, [navigate, gameLocation]);

  useEffect(() => {
    const gameStateToken = getGameStateToken();
    loadInitialTerminalItems(gameStateToken).then((items) => enqueue(items));
    if (gameStateToken) {
      setSkipAnimation(true);
    }
  }, [enqueue, setSkipAnimation]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F6") {
        alert(
          "Gute Idee, aber nicht nötig. Das Spiel benötigt keine speziellen Tasten - Eintippen im mysteriösen Terminal reicht völlig aus. :)",
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    console.log(
      "%cHier müsst ihr nichts suchen. Alles was ihr braucht ist durch normales Interagieren mit dem Spiel erreichbar.",
      "font-size: 1rem; font-weight: bold;",
    );
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const newUrl = getLocationImageUrl(gameLocation);
    if (newUrl === displayedImageUrl) {
      return;
    }

    const img = new window.Image();
    img.src = newUrl;
    img.onload = () => setDisplayedImageUrl(newUrl);
  }, [gameLocation, displayedImageUrl]);

  return (
    <div className="flex size-full items-center justify-center">
      <div className="absolute inset-0 -z-40 bg-black" />
      <div
        className="absolute inset-0 -z-40 bg-cover bg-center bg-no-repeat blur-[100px] transition-all duration-1200"
        style={{
          backgroundImage: `url(${displayedImageUrl})`,
        }}
      />
      <NavBar className="absolute top-8 right-8 z-40" />
      <Locations />
    </div>
  );
};
