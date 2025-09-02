import React, { FC } from "react";

import { MagnifyingGlass } from "@/client/components/widgets/MagnifyingGlass";
import { GameLocation } from "@/domain-model";

interface Props {
  onNavigation: (location: GameLocation) => void;
}

export const Room: FC<Props> = ({ onNavigation }) => (
  <div className="relative flex size-full items-center justify-center">
    <MagnifyingGlass
      className="translate-x-[-300px] translate-y-[-20px]"
      onClick={() => onNavigation(GameLocation.TERMINAL)}
    />
    <MagnifyingGlass
      className="translate-x-[150px] translate-y-[180px]"
      onClick={() => onNavigation(GameLocation.BRIEFCASE)}
    />
    <MagnifyingGlass
      className="translate-x-[450px] translate-y-[250px]"
      onClick={() => onNavigation(GameLocation.COFFE_CUP)}
    />
    <MagnifyingGlass
      className="translate-x-[440px] translate-y-[350px]"
      onClick={() => onNavigation(GameLocation.ASHTRAY)}
    />
  </div>
);
