// contexts/TimerContext.tsx
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

const INITIAL_DURATION = 10;

interface TimerContextProps {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextProps>({
  duration: INITIAL_DURATION,
  setDuration: () => {},
});

interface TimerProviderProps {
  children: ReactNode;
}

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [duration, setDuration] = useState(INITIAL_DURATION);

  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
