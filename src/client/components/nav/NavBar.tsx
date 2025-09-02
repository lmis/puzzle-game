import React, { FC } from "react";

import { NavButton } from "@/client/components/nav/NavButton";
import { GameLocation } from "@/domain-model";

interface Props {
  gameLocation: GameLocation;
  onNavigation: (location: GameLocation) => void;
  onBack: () => void;
}

export const NavBar: FC<Props> = ({ gameLocation, onNavigation, onBack }) => {
  return (
    <div className="absolute top-4 right-4 z-40 flex flex-col items-center justify-center gap-4">
      {gameLocation !== GameLocation.HELP && (
        <NavButton
          label="hilfe"
          onClick={() => onNavigation(GameLocation.HELP)}
          symbol="?"
        />
      )}
      {gameLocation !== GameLocation.INTRODUCTION && (
        <div className="flex flex-col items-center justify-center gap-4 lg:hidden">
          {gameLocation !== GameLocation.ASHTRAY && (
            <NavButton
              label="ashenbecher"
              onClick={() => onNavigation(GameLocation.ASHTRAY)}
              symbol="🚬"
            />
          )}
          {gameLocation !== GameLocation.COFFE_CUP && (
            <NavButton
              label="kaffeetasse"
              onClick={() => onNavigation(GameLocation.COFFE_CUP)}
              symbol="☕"
            />
          )}
          {gameLocation !== GameLocation.TERMINAL && (
            <NavButton
              label="computer"
              onClick={() => onNavigation(GameLocation.TERMINAL)}
              symbol="💻"
            />
          )}
          {gameLocation !== GameLocation.BRIEFCASE && (
            <NavButton
              label="koffer"
              onClick={() => onNavigation(GameLocation.BRIEFCASE)}
              symbol="💼"
            />
          )}
          {gameLocation !== GameLocation.ROOM && (
            <NavButton
              label="raum"
              onClick={() => onNavigation(GameLocation.ROOM)}
              symbol="🏠"
            />
          )}
        </div>
      )}
      <NavButton label="zurück" onClick={onBack} symbol="<" />
    </div>
  );
};
