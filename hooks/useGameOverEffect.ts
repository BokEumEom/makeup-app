import React, { useEffect } from "react";
import { useGameState } from "../stores/game-state";

export const useGameOverEffect = (cb: () => void) => {
  const state = useGameState();

  useEffect(() => {
    // reset changes when game is restarting
    if (state === "ideal") {
      cb();
    }
  }, [state]);
};
