"use client";

import React, { FC } from "react";

import { LocationContainer } from "@/client/components/widgets/LocationContainer";
import { MagnifyingGlass } from "@/client/components/widgets/MagnifyingGlass";
import { RoomArrow } from "@/client/components/widgets/RoomArrow";
import { useGameState } from "@/client/state/game-state";
import { GameLocation } from "@/domain-model";

export const Safehouse: FC = () => {
  const { navigate } = useGameState();
  return (
    <LocationContainer name="Safehouse" gameLocation={GameLocation.SAFEHOUSE}>
      <MagnifyingGlass
        className="absolute top-[45%] left-[30%]"
        onClick={() => navigate(GameLocation.TERMINAL)}
      />
      <MagnifyingGlass
        className="absolute top-[65%] left-[60%]"
        onClick={() => navigate(GameLocation.BRIEFCASE)}
      />
      <MagnifyingGlass
        className="absolute top-[72%] left-[78%]"
        onClick={() => navigate(GameLocation.COFFE_CUP)}
      />
      <MagnifyingGlass
        className="absolute top-[82%] left-[74%]"
        onClick={() => navigate(GameLocation.ASHTRAY)}
      />
      <RoomArrow
        className="absolute top-[85%] left-[2%] transform-[rotate(180deg)]"
        onClick={() => navigate(GameLocation.AGENTS)}
      />
    </LocationContainer>
  );
};
