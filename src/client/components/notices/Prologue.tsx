"use client";

import React, { FC } from "react";

import { TextDisplay } from "@/client/components/widgets/TextDisplay";

interface Props {
  onClose?: () => void;
}

export const Prologue: FC<Props> = ({ onClose }) => (
  <TextDisplay
    onAccept={onClose}
    ariaLabel="einleitung-schließen"
    title="Westberlin, September 1986"
    confirmText="Spiel starten"
  >
    <p>
      Ihr erreicht das Safehouse in den frühen Morgenstunden. Westberlin ist
      grau verhangen, die Straßen riechen nach kaltem Regen und Auspuff. Der
      Fahrer sagt kein Wort, bis der Wagen vor einer unscheinbaren Tür hält –
      rotes, abblätterndes Emaille-Schild über dem Eingang, die Zahl 13. Drinnen
      riecht es nach Staub, Metall und abgestandenem Kaffee.
      &laquo;Blaukraut&raquo; erwartet euch. Er wirkt ausgezehrt, als hätte er
      die letzten Nächte kaum geschlafen. Auf dem Tisch vor ihm: ein abgewetzter
      Koffer, das Herzstück dieser Geschichte.
    </p>
    <p>
      Er faßt euch ins Bild. Am 12. September 1986 meldete sich der Maulwurf
      &laquo;Schwungrad&raquo; das letzte Mal mit klaren Worten. Er sei
      enttarnt, die alten Codes nicht mehr sicher. Am 14. September legte er den
      Koffer ab – im Lichtenberger Bahnhof, Ostberlin, voller Kassetten und
      einem präparierten KC85/3 und verschwand danach Spurlos. Kein
      Lebesnzeichen, keine Verhaftung, keine Leiche, nur Stille.
    </p>
    <p>
      Am 19. gelang es &laquo;Blaukraut&raquo;, den Koffer über die Grenze zu
      bringen. Seitdem hockt er hier, abgeschirmt in einem Faraday-Käfig, kämpft
      gegen einen Code, den niemand kennt. &laquo;Schwungrad&raquo; hat seine
      letzten Erkenntnisse verschlüsselt – aber nach seiner eigenen Logik.
    </p>
    <p>
      &ldquo;Ich hab&apos; das Ding zum laufen gekriegt, aber das einzige
      Programm ist ein kaputtes Kinderspiel.&rdquo; &laquo;Blaukraut&raquo;
      schüttelt den Kopf. &ldquo;Da muss mehr dahinterstecken.
      &laquo;Schwungrad&raquo; war kein Spinner!&rdquo;
    </p>
    <p className="pt-2">
      Nun seid ihr hier, weil ihr die Einzigen seid, die diesem Rätsel Leben
      einhauchen können. Eure Aufgabe: das letzte Werk eines Mannes
      dechiffrieren, der vielleicht schon längst tot ist – und dabei die
      Schatten nicht aus den Augen verlieren, die schon in den Straßen warten.
    </p>
  </TextDisplay>
);
