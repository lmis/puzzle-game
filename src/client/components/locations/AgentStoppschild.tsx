"use client";

import React, { FC } from "react";

import { LocationContainer } from "@/client/components/widgets/LocationContainer";
import { TextDisplay } from "@/client/components/widgets/TextDisplay";
import { useGameState } from "@/client/state/game-state";
import { GameLocation } from "@/domain-model";

export const AgentStoppschild: FC = () => {
  const { back } = useGameState();
  return (
    <LocationContainer
      name="Agent Kaffekrug"
      gameLocation={GameLocation.AGENT_STOPPSCHILD}
    >
      <TextDisplay
        onConfirm={back}
        ariaLabel="zurück"
        title="Agent Stoppschild"
        confirmText="Zurück"
      >
        <p>
          &laquo;Stoppschild&raquo; hat langjährige Erfahrung im Feld,
          insbesondere dort, wo es brenzlig wird.
        </p>
        <p>
          Er und &laquo;Brautkleid&raquo; sind ein eingespieltes Team, das sich
          blind vertraut und aufeinander verlassen kann.
        </p>
      </TextDisplay>
    </LocationContainer>
  );
};
