import React, { FC, useState } from "react";

import { GameRules } from "@/client/components/notices/GameRule";
import { LegalNotice } from "@/client/components/notices/LegalNotice";
import { Prologue } from "@/client/components/notices/Prologue";
import { TextDisplay } from "@/client/components/widgets/TextDisplay";
import { clearStorage } from "@/client/state/local-storage";

interface Props {
  onClose: () => void;
}

enum HelpTab {
  PROLOGUE,
  RULES,
  LEGAL,
  RESET,
}

const tabs = [
  { label: "Einleitung", key: HelpTab.PROLOGUE },
  { label: "Regeln", key: HelpTab.RULES },
  { label: "Impressum", key: HelpTab.LEGAL },
  { label: "Spielfortschritt zurücksetzen", key: HelpTab.RESET },
];

export const Help: FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(HelpTab.PROLOGUE);

  return (
    <div className="relative w-full max-w-240 overflow-x-auto rounded-lg bg-slate-900 p-6 text-gray-50 opacity-95 shadow-lg">
      <button
        className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-cyan-300"
        onClick={onClose}
        aria-label="schließen"
      >
        &times;
      </button>
      <div className="mb-4 flex border-b border-slate-700">
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
      <div>
        {activeTab === HelpTab.PROLOGUE && <Prologue />}
        {activeTab === HelpTab.RULES && <GameRules />}
        {activeTab === HelpTab.LEGAL && <LegalNotice />}
        {activeTab === HelpTab.RESET && (
          <TextDisplay
            ariaLabel="spiel-zurücksetzen"
            title="Spielfortschritt zurücksetzen"
            confirmText="Zurücksetzen"
            onAccept={() => {
              clearStorage();
              window.location.reload();
            }}
          >
            <p className="mb-4">
              Mit dem Klick auf &quot;Zurücksetzen&quot; werden alle
              gespeicherten Daten gelöscht und das Spiel startet von vorne.
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
          </TextDisplay>
        )}
      </div>
    </div>
  );
};
