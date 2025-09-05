"use client";

import React, { FC, useState } from "react";

import { GameRules } from "@/client/components/notices/GameRule";
import { LegalNotice } from "@/client/components/notices/LegalNotice";
import { Prologue } from "@/client/components/notices/Prologue";
import { LocationContainer } from "@/client/components/widgets/LocationContainer";
import { GameLocation } from "@/domain-model";

enum HelpTab {
  PROLOGUE,
  RULES,
  LEGAL,
  RESET,
}

const tabs = [
  { label: "Einleitung", key: HelpTab.PROLOGUE },
  { label: "Regeln", key: HelpTab.RULES },
  { label: "Rechtliches", key: HelpTab.LEGAL },
  { label: "Spielfortschritt zurücksetzen", key: HelpTab.RESET },
];

export const Help: FC = () => {
  const [activeTab, setActiveTab] = useState(HelpTab.PROLOGUE);

  return (
    <LocationContainer name="hilfe" gameLocation={GameLocation.HELP}>
      <div className="relative max-h-[95vh] w-full max-w-240 overflow-y-auto bg-slate-900 p-6 text-gray-50 opacity-95 shadow-lg">
        <div className="m-1 flex overflow-x-auto p-4 pb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 px-4 py-2 text-center font-semibold transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-cyan-400 text-cyan-400"
                  : "text-gray-400 hover:text-cyan-300"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="z-10 max-w-240 overflow-y-auto text-gray-500">
          <div className="flex flex-col gap-2">
            {activeTab === HelpTab.PROLOGUE && <Prologue />}
            {activeTab === HelpTab.RULES && <GameRules />}
            {activeTab === HelpTab.LEGAL && <LegalNotice />}
          </div>
          {activeTab === HelpTab.RESET && (
            <>
              <p className="pb-4">
                Mit dem Klick auf &quot;Zurücksetzen&quot; werden alle
                gespeicherten Daten gelöscht und das Spiel startet von vorne.
                Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
              <button
                onClick={() => {
                  localStorage.clear();
                  location.reload();
                }}
                className="mt-4 rounded bg-cyan-300 px-4 py-2 font-bold text-gray-900 hover:bg-cyan-400"
                aria-label="spielfortschritt-zurücksetzen"
              >
                Zurücksetzen
              </button>
            </>
          )}
        </div>
      </div>
    </LocationContainer>
  );
};
