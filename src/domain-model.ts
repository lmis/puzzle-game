export type RiddleResult =
  | {
      correct: false;
    }
  | {
      correct: true;
      next: TerminalItem;
      token: string;
    };

export enum GameLocation {
  NONE,
  TERMINAL,
  SAFEHOUSE,
  AGENTS,
  HEALTH_WARNING_AND_PRIVACY,
  LEGAL_NOTICE,
  PROLOGUE,
  GAME_RULES,
  HELP,
  ASHTRAY,
  COFFE_CUP,
  BRIEFCASE,
  AGENT_BRAUTKLEID,
  AGENT_STOPPSCHILD,
}

export type TerminalItem = {
  key: string;
  content: string;
  input?: boolean;
};

export const CONGRATULATIONS_KEY = "congratulations";
export const isCongratulations = (item: TerminalItem) =>
  item.key === CONGRATULATIONS_KEY;
