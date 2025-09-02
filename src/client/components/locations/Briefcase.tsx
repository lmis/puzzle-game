import React, { FC } from "react";

import { TextDisplay } from "@/client/components/widgets/TextDisplay";

interface Props {
  onClose: () => void;
}

export const Briefcase: FC<Props> = ({ onClose }) => {
  return (
    <TextDisplay
      onAccept={onClose}
      ariaLabel="zurück"
      title="Abgewetzter Lederkoffer"
      confirmText="Zurück"
    >
      <p>
        Der Koffer ist aus braunem Leder, die Ecken sind abgewetzt, der Griff
        ist schon etwas eingerissen. Innen ist er mit grünem Stoff ausgekleidet,
        der schon etwas ausgeblichen ist. &laquo;Blaukraut&raquo; hat daraus den
        KC85/3 genommen, und Kassette um Kassete hineingeschoben. Kasette 2,
        enthält das merkwürdige Kinderspiel, die anderen hat
        &laquo;Blaukraut&raquo; schon durchgesehen - nichts brauchbares.
      </p>
      <p>
        Sieht unscheinbar aus, dieser Koffer, dafür, dass
        &laquo;Schwungrad&raquo; sein Leben riskiert hat, als er damit durch den
        Lichtenberger Bahnhof lief. Er ging durch die Schalterhalle zu den
        Schliessfächern. Vierundvierzig, seine Glückszahl - zweite Reihe von
        unten, drittes Fach von rechts. Er legte den Koffer hinein, schloss das
        Fach ab, zündete sich eine Zigarette an und verschwand in der Menge.
      </p>
      <p>
        Wie &laquo;Blaukraut&raquo; damit lebend über die Grenze kam, will er
        nicht verraten, doch er lässt durchblicken, dass ihm die Amis noch einen
        gefallen schuldig waren.
      </p>
    </TextDisplay>
  );
};
