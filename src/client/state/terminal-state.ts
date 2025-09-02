import { create } from "zustand";

import {
  getGameStateToken,
  setGameStateToken,
} from "@/client/state/local-storage";
import { TerminalItem } from "@/domain-model";
import { wait } from "@/lib/time";
import { submitAnswer } from "@/server/actions/submit-answer";

export interface DisplayItem {
  key: string;
  content: string;
  input?: boolean;
}

export interface QueueItem extends TerminalItem {
  partiallyRendered?: boolean;
}

export interface TerminalState {
  queue: QueueItem[];
  display: DisplayItem[];
  userInput: string | null;
  isAnimating: boolean;
}

export interface TerminalActions {
  startAnimation: () => Promise<void>;
  acceptKeypress: (key: string) => void;
  enqueue: (items: TerminalItem[]) => void;
  submitLastInput: () => Promise<void>;
}

const CRT_CHAR_DELAY = 15;
const CRT_LINE_DELAY = 15;
const INPUT_MIN_DELAY = 20;
const INPUT_MAX_DELAY = 80;

export const useTerminalState = create<TerminalState & TerminalActions>(
  (set, getState) => {
    return {
      queue: [],
      display: [],
      userInput: null,
      isAnimating: false,
      startAnimation: async () => {
        if (getState().isAnimating) {
          return;
        }
        set({ isAnimating: true });
        let running = true;
        while (running) {
          let waitTime: number = 0;
          set((state) => {
            if (state.queue.length === 0) {
              running = false;
              return state;
            }
            const item = state.queue[0];
            const nextCharacter = item.content[0];
            const newDisplay = [...state.display];
            if (item.partiallyRendered) {
              const lastItem = { ...newDisplay[newDisplay.length - 1] };
              lastItem.content += nextCharacter;
              newDisplay[newDisplay.length - 1] = lastItem;
            } else {
              newDisplay.push({ ...item, content: nextCharacter });
            }

            const itemDone = item.content.length === 1;
            let newQueue = state.queue.slice(1);
            if (!itemDone) {
              const newItem: QueueItem = {
                ...item,
                content: item.content.slice(1),
                partiallyRendered: true,
              };
              newQueue = [newItem, ...newQueue];
            }

            if (item.input) {
              waitTime =
                INPUT_MIN_DELAY +
                Math.random() * (INPUT_MAX_DELAY - INPUT_MIN_DELAY);
            } else {
              waitTime =
                nextCharacter === "\n" ? CRT_LINE_DELAY : CRT_CHAR_DELAY;
            }

            return {
              ...state,
              display: newDisplay,
              queue: newQueue,
            };
          });

          await wait(waitTime);
        }
        set({ isAnimating: false });
      },
      acceptKeypress: (key: string) => {
        set((state) => {
          if (key === "Enter" && state.userInput !== null) {
            return {
              ...state,
              display: [
                ...state.display,
                {
                  key: `user-input-${Date.now()}`,
                  content: state.userInput,
                  input: true,
                },
              ],
              userInput: null,
            };
          }
          if (key === "Backspace" && state.userInput !== null) {
            return {
              ...state,
              userInput: state.userInput.slice(0, -1) ?? null,
            };
          }
          if (key.length === 1) {
            return {
              ...state,
              userInput: (state.userInput ?? "") + key,
            };
          }
          return state;
        });
      },
      enqueue: (items: TerminalItem[]) =>
        set((state) => ({
          ...state,
          queue: [...state.queue, ...items],
        })),
      submitLastInput: async () => {
        const { display } = getState();
        const item = display[display.length - 1];
        if (!item?.input) {
          return;
        }
        const res = await submitAnswer(item.content, getGameStateToken());
        if (res.correct) {
          setGameStateToken(res.token);
          set((state) => ({
            ...state,
            queue: [...state.queue, res.next],
          }));
          return;
        }

        set((state) => ({
          ...state,
          queue: [
            ...state.queue,
            {
              key: `wrong-answer-${Date.now()}`,
              content: "Falsche Antwort. Versuche es erneut.",
            },
          ],
        }));
      },
    };
  },
);
