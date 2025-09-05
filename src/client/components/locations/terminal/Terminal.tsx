"use client";

import React, { FC } from "react";

import {
  DesktopDisplay,
  MobileDisplay,
} from "@/client/components/locations/terminal/Display";
import { LocationContainer } from "@/client/components/widgets/LocationContainer";
import { useIsLg } from "@/client/media-queries";
import { useTerminalState } from "@/client/state/terminal-state";
import { GameLocation } from "@/domain-model";

export const Terminal: FC = () => {
  const { scroll } = useTerminalState();
  const isLg = useIsLg();
  return (
    <LocationContainer name="Terminal" gameLocation={GameLocation.TERMINAL}>
      {isLg ? (
        <div
          className="block h-[550px] w-[720px] translate-x-[-5px] translate-y-[-65px]"
          onWheel={(e) => {
            scroll(
              e.deltaY > 0 ? Math.max(e.deltaY, 15) : Math.min(e.deltaY, -15),
            );
          }}
        >
          <DesktopDisplay />
        </div>
      ) : (
        <div className="h-[90vh] w-screen">
          <MobileDisplay />
        </div>
      )}
    </LocationContainer>
  );
};
