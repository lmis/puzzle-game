"use client";

import React, { FC, useState } from "react";

import { GameRules } from "@/client/components/notices/GameRule";
import { LegalNotice } from "@/client/components/notices/LegalNotice";
import { Prologue } from "@/client/components/notices/Prologue";
import { TextDisplay } from "@/client/components/widgets/TextDisplay";
import { setSkipIntro } from "@/client/state/local-storage";

interface Props {
  onClose: () => void;
}

enum IntroductionStep {
  WARNING,
  LEGAL_NOTICE,
  GAME_RULES,
  PROLOGUE,
}

export const Introduction: FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(IntroductionStep.WARNING);

  switch (step) {
    case IntroductionStep.WARNING:
      return (
        <TextDisplay
          onAccept={() => setStep(IntroductionStep.GAME_RULES)}
          ariaLabel="gesundheitshinweis-und-datenschutz-akzeptieren"
          title="Gesundheits und Datenschutzhinweis"
          confirmText="Akzeptieren"
        >
          <p className="font-bold">
            Warnung: Dieses Spiel enthält Bewegungsgrafiken und flackernde
            Lichter.
          </p>

          <p>
            Mit Klicken auf &laquo;Akzeptieren&raquo; bestätigst du, dass du
            Gesundheitshinweis und die
            <a
              href="#"
              className="px-2 text-cyan-400 underline hover:text-cyan-300 focus:text-cyan-300"
              aria-label="datenschutzerklärung-lesen"
              onClick={(e) => {
                e.preventDefault();
                setStep(IntroductionStep.LEGAL_NOTICE);
              }}
            >
              Impressum & Datenschutzerklärung
            </a>
            gelesen und verstanden hast und akzeptierst.
          </p>
        </TextDisplay>
      );
    case IntroductionStep.LEGAL_NOTICE:
      return <LegalNotice onClose={() => setStep(IntroductionStep.WARNING)} />;
    case IntroductionStep.GAME_RULES:
      return <GameRules onClose={() => setStep(IntroductionStep.PROLOGUE)} />;
    case IntroductionStep.PROLOGUE:
      return (
        <Prologue
          onClose={() => {
            setSkipIntro();
            onClose();
          }}
        />
      );
  }
};
