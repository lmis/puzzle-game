"use server";

import { TerminalItem } from "@/domain-model";
import { readJwtContent } from "@/server/service/jwt";
import {
  getAnsweredQuestions,
  getNextQuestionOrCongratulations,
} from "@/server/service/riddles";

export const loadInitialTerminalItems = async (
  token: string | null,
): Promise<TerminalItem[]> => {
  const key = readJwtContent(token)?.key ?? 0;

  return [...getAnsweredQuestions(key), getNextQuestionOrCongratulations(key)];
};
