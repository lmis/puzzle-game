"use server";

import { RiddleResult } from "@/domain-model";
import { createJwt, readJwtContent } from "@/server/service/jwt";
import {
  check,
  getNextQuestionOrCongratulations,
} from "@/server/service/riddles";

export const submitAnswer = async (
  answer: string,
  token: string | null,
): Promise<RiddleResult> => {
  const currentKey = readJwtContent(token)?.key ?? 0;

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
