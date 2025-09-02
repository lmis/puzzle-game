"use client";

import React, { FC } from "react";

import { TextDisplay } from "@/client/components/widgets/TextDisplay";

interface Props {
  onClose?: () => void;
}

export const GameRules: FC<Props> = ({ onClose }) => (
  <TextDisplay
    onAccept={onClose}
    ariaLabel="Spielregeln-verstanden"
    title="Spielregeln"
    confirmText="Verstanden"
  >
    <p>
      Dies ist ein Rätselspiel. Die Lösungen werden jeweils im Terminal am
      mysteriösen KC85/3 eingetippt.
    </p>
    <p className="pt-2">
      Bei manchen Rätseln, kann es helfen ein kleines Programm zu schreiben, in
      welches ihr die Rätseltexte kopiert.{" "}
      <strong>
        Es muss allerdings nie programmatisch mit dieser Webseite oder dem
        dazugehörigen backend interagiert werden.
      </strong>
    </p>
    <p>
      Insbesondere brute-force versuche, die Lösung zu erraten sind nicht
      zielführend und nicht erlaubt und können vom hosting provider als Angriff
      gesehen werden.
    </p>
  </TextDisplay>
);
