"use client";

import React, { FC } from "react";

import { TextDisplay } from "@/client/components/widgets/TextDisplay";

interface Props {
  onClose?: () => void;
}

export const LegalNotice: FC<Props> = ({ onClose }) => (
  <TextDisplay
    onAccept={onClose}
    ariaLabel="impressum-und-datenschutz-schließen"
    title="Impressum & Datenschutz"
    confirmText="Schließen"
  >
    <p>
      Dieses Spiel setzt keine cookies und benutzt keine third party cookies.
      Alle Spieldaten werden lokal gespeichert.
    </p>
    <p>
      Der Hosting-Provider (Vercel) kann einige technische Informationen über
      dein Gerät wie IP-Adresse oder User-Agent zu Audit- und Sicherheitszwecken
      protokollieren.
    </p>
  </TextDisplay>
);
