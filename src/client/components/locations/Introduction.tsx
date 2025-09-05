"use client";

import React, { FC } from "react";

import { GameRules } from "@/client/components/notices/GameRule";
import { HealthWarningAndPrivacy } from "@/client/components/notices/HealthWarningAndPrivacy";
import { LegalNotice } from "@/client/components/notices/LegalNotice";
import { Prologue } from "@/client/components/notices/Prologue";
import { LocationContainer } from "@/client/components/widgets/LocationContainer";
import { TextDisplay } from "@/client/components/widgets/TextDisplay";
import { useGameState } from "@/client/state/game-state";
import { setSkipIntro } from "@/client/state/local-storage";
import { GameLocation } from "@/domain-model";

export const Introduction: FC = () => {
  const { back, navigate } = useGameState();

  return (
    <>
      <LocationContainer
        name="Gesundheits und Datenschutzhinweid"
        gameLocation={GameLocation.HEALTH_WARNING_AND_PRIVACY}
      >
        <TextDisplay
          onConfirm={() => navigate(GameLocation.GAME_RULES)}
          ariaLabel="gesundheitshinweis-und-datenschutz-akzeptieren"
          title="Gesundheits und Datenschutzhinweis"
          confirmText="Akzeptieren"
        >
          <HealthWarningAndPrivacy />
        </TextDisplay>
      </LocationContainer>
      <LocationContainer
        name="Rechtliches"
        gameLocation={GameLocation.LEGAL_NOTICE}
      >
        <TextDisplay
          onConfirm={back}
          ariaLabel="rechtliches-schließen"
          title="Rechtliches"
          confirmText="Schließen"
        >
          <LegalNotice />
        </TextDisplay>
      </LocationContainer>
      <LocationContainer
        name="Spielregeln"
        gameLocation={GameLocation.GAME_RULES}
      >
        <TextDisplay
          onConfirm={() => navigate(GameLocation.PROLOGUE)}
          ariaLabel="Spielregeln-verstanden"
          title="Spielregeln"
          confirmText="Verstanden"
        >
          <GameRules />
        </TextDisplay>
      </LocationContainer>
      <LocationContainer name="Einleitung" gameLocation={GameLocation.PROLOGUE}>
        <TextDisplay
          onConfirm={() => {
            setSkipIntro();
            navigate(GameLocation.SAFEHOUSE);
          }}
          ariaLabel="einleitung-schließen"
          title="Westberlin, September 1986"
          confirmText="Spiel starten"
        >
          <Prologue />
        </TextDisplay>
      </LocationContainer>
    </>
  );
};
