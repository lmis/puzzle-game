import { create } from "zustand";

import { GameLocation } from "@/domain-model";

export interface GameState {
  gameLocation: GameLocation;
  locationHistory: GameLocation[];
}

export interface GameActions {
  back: () => void;
  navigate: (location: GameLocation) => void;
}

export const useGameState = create<GameState & GameActions>((set) => ({
  gameLocation: GameLocation.NONE,
  locationHistory: [],
  back: () => {
    set((state) => {
      if (state.locationHistory.length <= 1) {
        return state;
      }
      return {
        ...state,
        locationHistory: state.locationHistory.slice(1),
        gameLocation: state.locationHistory[1],
      };
    });
  },
  navigate: (location: GameLocation) => {
    set((state) => ({
      locationHistory: [location, ...state.locationHistory],
      gameLocation: location,
    }));
  },
}));
