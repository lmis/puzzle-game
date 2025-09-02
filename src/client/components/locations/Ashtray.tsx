import React, { FC } from "react";

import { TextDisplay } from "@/client/components/widgets/TextDisplay";

interface Props {
  onClose: () => void;
}

export const Ashtray: FC<Props> = ({ onClose }) => {
  return (
    <TextDisplay
      onAccept={onClose}
      ariaLabel="zurück"
      title="Kippen"
      confirmText="Zurück"
    >
      <p>
        Die inoffizielle Währung des Ostens. Eine F6 hier, &apos;ne Karo da - so
        öffnet sich so manche Türe.
      </p>
      <p>
        &laquo;Schwungrad&raquo; rauchte immer was aus &apos;nem Volkseigenen
        Betrieb, die Westzigaretten nahm er nur zum Handeln.
      </p>
      <p>
        Hier brennt die Marlboro Light von &laquo;Blaukraut&raquo; -{" "}
        <span className="text-[7px]">♫♫</span> milde Sorte, denn das Leben ist
        schon hart genug <span className="align-super text-[7px]">♫♫</span>.
      </p>
    </TextDisplay>
  );
};
