import React, { FC } from "react";

import { Ashtray } from "@/client/components/locations/Ashtray";
import { Briefcase } from "@/client/components/locations/Briefcase";
import { CoffeeCup } from "@/client/components/locations/CoffeCup";
import { Help } from "@/client/components/locations/Help";
import { Introduction } from "@/client/components/locations/Introduction";
import { Room } from "@/client/components/locations/Room";
import { Terminal } from "@/client/components/locations/Terminal";
import { GameLocation } from "@/domain-model";
import { inexhaustive } from "@/lib/enum";

interface Props {
  gameLocation: GameLocation;
  onNavigation: (location: GameLocation) => void;
  onBack: () => void;
}

export const Location: FC<Props> = ({ onNavigation, onBack, gameLocation }) => {
  switch (gameLocation) {
    case GameLocation.INTRODUCTION:
      return <Introduction onClose={() => onNavigation(GameLocation.ROOM)} />;
    case GameLocation.ROOM:
      return <Room onNavigation={onNavigation} />;
    case GameLocation.TERMINAL:
      return <Terminal />;
    case GameLocation.ASHTRAY:
      return <Ashtray onClose={() => onNavigation(GameLocation.ROOM)} />;
    case GameLocation.COFFE_CUP:
      return <CoffeeCup onClose={() => onNavigation(GameLocation.ROOM)} />;
    case GameLocation.BRIEFCASE:
      return <Briefcase onClose={() => onNavigation(GameLocation.ROOM)} />;
    case GameLocation.HELP:
      return <Help onClose={onBack} />;
    case GameLocation.NONE:
      return null;
    default:
      return inexhaustive(gameLocation);
  }
};
