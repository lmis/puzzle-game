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
  ROOM,
  INTRODUCTION,
  HELP,
  ASHTRAY,
  COFFE_CUP,
  BRIEFCASE,
}

export type TerminalItem = {
  key: string;
  content: string;
  input?: boolean;
};

export const CONGRATULATIONS_KEY = "congratulations";
export const isCongratulations = (item: TerminalItem) =>
  item.key === CONGRATULATIONS_KEY;
