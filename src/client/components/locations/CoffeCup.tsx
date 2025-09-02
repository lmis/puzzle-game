import React, { FC } from "react";

import { TextDisplay } from "@/client/components/widgets/TextDisplay";

interface Props {
  onClose: () => void;
}

export const CoffeeCup: FC<Props> = ({ onClose }) => {
  return (
    <TextDisplay
      onAccept={onClose}
      ariaLabel="zurück"
      title="Kaffeetasse"
      confirmText="Zurück"
    >
      <p>
        &laquo;Blaukraut&raquo; scheint schon ganze Nächte vor diesem Rechner zu
        sitzen, wenn man den Zustand seiner Kaffeetasse betrachtet, auch die
        Melitta in der kleinen Küche ist schon fast leer. Mal sehen, was die
        Firma spendiert hat: Dallmayr oder Jacobs Krönung?
      </p>
    </TextDisplay>
  );
};
