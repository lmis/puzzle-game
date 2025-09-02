"use server";

import { RiddleResult, TerminalItem } from "@/domain-model";
import { createJwt, readJwtContent } from "@/server/service/jwt";
import {
  check,
  getAnsweredQuestions,
  getNextQuestionOrCongratulations,
} from "@/server/service/riddles";

export const loadInitialTerminalItems = async (
  token: string | null,
): Promise<TerminalItem[]> => {
  const key = readJwtContent(token)?.key ?? 0;

  return [...getAnsweredQuestions(key), getNextQuestionOrCongratulations(key)];
};

export const submitAnswer = async (
  answer: string,
  token: string | null,
): Promise<RiddleResult> => {
  const currentKey = (await readJwtContent(token))?.key ?? 0;

  if (!check(currentKey, answer)) {
    return { correct: false };
  }

  const key = currentKey + 1;
  const newToken = createJwt({ key });

  return {
    correct: true,
    next: getNextQuestionOrCongratulations(key),
    token: newToken,
  };
};
