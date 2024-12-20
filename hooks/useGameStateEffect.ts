import React, { useEffect, useRef } from "react";
import { useGameState } from "../stores/game-state";

export const useGameStateEffect = (
  callback: () => void,
  timer: number = 500
) => {
  const gameState = useGameState();
  const timeInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (gameState === "running" || gameState === "resumed") {
      timeInterval.current = setInterval(callback, timer);
    } else if (gameState === "paused") {
      clearInterval(timeInterval.current);
    } else if (gameState === "game-over") {
      clearInterval(timeInterval.current);
      // reset the game
    }
    return () => clearInterval(timeInterval.current);
  }, [gameState]);

  return timeInterval;
};
