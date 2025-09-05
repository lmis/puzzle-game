"use client";

import React, { FC } from "react";

import { LocationContainer } from "@/client/components/widgets/LocationContainer";
import { MagnifyingGlass } from "@/client/components/widgets/MagnifyingGlass";
import { RoomArrow } from "@/client/components/widgets/RoomArrow";
import { useGameState } from "@/client/state/game-state";
import { GameLocation } from "@/domain-model";

export const Agents: FC = () => {
  const { navigate } = useGameState();
  return (
    <LocationContainer name="Agenten" gameLocation={GameLocation.AGENTS}>
      <MagnifyingGlass
        className="absolute top-[55%] left-[50%]"
        onClick={() => navigate(GameLocation.AGENT_STOPPSCHILD)}
      />
      <MagnifyingGlass
        className="absolute top-[65%] left-[80%]"
        onClick={() => navigate(GameLocation.AGENT_BRAUTKLEID)}
      />
      <RoomArrow
        className="absolute top-[85%] left-[92%]"
        onClick={() => navigate(GameLocation.SAFEHOUSE)}
      />
    </LocationContainer>
  );
};
