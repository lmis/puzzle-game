import { create } from "zustand";

import {
  getGameStateToken,
  setGameStateToken,
} from "@/client/state/local-storage";
import { TerminalItem, isCongratulations } from "@/domain-model";
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
  skipAnimation: boolean;
  acceptsInput: boolean;
  scrollCallback: (height: number) => void;
}

export interface TerminalActions {
  scroll: (height: number) => void;
  setScrollCallback: (scrollCallback: (height: number) => void) => void;
  setSkipAnimation: (skip: boolean) => void;
  startAnimation: (lineWidth: number) => Promise<void>;
  handleKeypress: (key: string) => void;
  enqueue: (items: TerminalItem[]) => void;
  submitLastInput: () => Promise<void>;
  setUserInput: (input: string | null) => void;
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
      skipAnimation: false,
      acceptsInput: false,
      setScrollCallback: (scrollCallback) => set({ scrollCallback }),
      scrollCallback: () => {},
      scroll: (height: number) => {
        const { isAnimating, scrollCallback } = getState();
        if (!isAnimating) {
          scrollCallback(height);
        }
      },
      setSkipAnimation: (skip: boolean) => set({ skipAnimation: skip }),
      setUserInput: (input: string | null) =>
        set({ userInput: input, skipAnimation: false }),
      startAnimation: async (lineWidth) => {
        if (getState().isAnimating || getState().queue.length === 0) {
          return;
        }
        set({ isAnimating: true, acceptsInput: false });
        set((state) => ({
          ...state,
          queue: state.queue.map((item) => ({
            ...item,
            content: limitLineWidth(lineWidth, item.content),
          })),
        }));
        if (getState().skipAnimation) {
          set((state) => ({
            display: [
              ...state.display,
              ...state.queue.map((item) => ({
                key: item.key,
                content: item.content,
                input: item.input,
              })),
            ],
            queue: [],
          }));
        } else {
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
        }
        set((state) => {
          const lastDisplayItem = state.display[state.display.length - 1];
          return {
            isAnimating: false,
            acceptsInput:
              state.queue.length === 0 && !isCongratulations(lastDisplayItem),
          };
        });
      },
      handleKeypress: (key: string) => {
        set((state) => {
          if (!state.acceptsInput) {
            return state;
          }
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
              skipAnimation: false,
              acceptsInput: false,
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

        if (key === "Enter") {
          getState().submitLastInput();
        }
      },
      enqueue: (items: TerminalItem[]) =>
        set((state) => ({
          ...state,
          queue: [...state.queue, ...items],
          acceptsInput: false,
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
            acceptsInput: false,
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
          acceptsInput: false,
        }));
      },
    };
  },
);

const limitLineWidth = (width: number, item: string) => {
  return item
    .split("\n")
    .map((line) => {
      const [first, ...rest] = line.split(" ");
      let res = first;
      let count = first.length;
      for (const word of rest) {
        if (count + word.length < width) {
          res += " " + word;
          count += word.length + 1;
        } else {
          res += "\n" + word;
          count = word.length;
        }
      }
      return res;
    })
    .join("\n");
};
