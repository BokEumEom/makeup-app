import React, { createContext, useState } from 'react';
import { initialQuests } from '../constants/quests';  // 퀘스트 데이터를 임포트

type Quest = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  started: boolean;
  progress: number;
};

type QuestContextProps = {
  quests: Quest[];
  acceptedQuests: Quest[];
  completedQuests: Quest[];
  completeQuest: (id: number) => void;
  startQuest: (id: number) => void;
  acceptQuest: (id: number) => void;
  cancelQuest: (id: number) => void;
  level: number;
  badges: string[];
};

export const QuestContext = createContext<QuestContextProps>({
  quests: [],
  acceptedQuests: [],
  completedQuests: [],
  completeQuest: () => {},
  startQuest: () => {},
  acceptQuest: () => {},
  cancelQuest: () => {},
  level: 1,
  badges: [],
});

export const QuestProvider: React.FC = ({ children }) => {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);  // initialQuests를 사용
  const [acceptedQuests, setAcceptedQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<string[]>([]);

  const completeQuest = (id: number) => {
    setAcceptedQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === id ? { ...quest, completed: true, progress: 100 } : quest
      )
    );

    const completedQuest = acceptedQuests.find((quest) => quest.id === id);
    if (completedQuest) {
      setCompletedQuests((prevCompleted) => [...prevCompleted, completedQuest]);
    }

    setLevel((prevLevel) => prevLevel + 1);
    setBadges((prevBadges) => [...prevBadges, `배지_${id}`]);
  };

  const startQuest = (id: number) => {
    setAcceptedQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === id ? { ...quest, started: true } : quest
      )
    );
  };

  const acceptQuest = (id: number) => {
    const quest = quests.find((q) => q.id === id);
    if (quest) {
      setAcceptedQuests((prevAccepted) => [...prevAccepted, { ...quest, started: false }]);
    }
  };

  const cancelQuest = (id: number) => {
    setAcceptedQuests((prevAccepted) => prevAccepted.filter((quest) => quest.id !== id));
  };

  return (
    <QuestContext.Provider
      value={{
        quests,
        acceptedQuests,
        completedQuests,
        completeQuest,
        startQuest,
        acceptQuest,
        cancelQuest,
        level,
        badges,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};
