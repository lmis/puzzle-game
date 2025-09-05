const GAME_STATE_TOKEN = "GAME_STATE_TOKEN";
const SKIP_INTRO = "SKIP_INTRO";

export const getGameStateToken = () => {
  return localStorage.getItem(GAME_STATE_TOKEN);
};

export const setGameStateToken = (token: string) => {
  localStorage.setItem(GAME_STATE_TOKEN, token);
};

export const getSkipIntro = () => {
  return localStorage?.getItem(SKIP_INTRO) === "true";
};

export const setSkipIntro = () => {
  localStorage.setItem(SKIP_INTRO, "true");
};
