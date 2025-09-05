import { GameLocation } from "@/domain-model";
import { inexhaustive } from "@/lib/enum";

export const getLocationImageUrl = (location: GameLocation) => {
  switch (location) {
    case GameLocation.HEALTH_WARNING_AND_PRIVACY:
    case GameLocation.ASHTRAY:
      return "/ashtray.png";
    case GameLocation.COFFE_CUP:
      return "/coffee-cup.png";
    case GameLocation.BRIEFCASE:
      return "/briefcase.png";
    case GameLocation.TERMINAL:
    case GameLocation.GAME_RULES:
      return "/terminal.png";
    case GameLocation.LEGAL_NOTICE:
    case GameLocation.HELP:
      return "/wall.png";
    case GameLocation.PROLOGUE:
    case GameLocation.AGENTS:
      return "/agents.png";
    case GameLocation.AGENT_BRAUTKLEID:
      return "/agent-brautkleid.png";
    case GameLocation.AGENT_STOPPSCHILD:
      return "/agent-stoppschild.png";
    case GameLocation.SAFEHOUSE:
    case GameLocation.NONE:
      return "/safehouse.png";
    default:
      return inexhaustive(location);
  }
};
