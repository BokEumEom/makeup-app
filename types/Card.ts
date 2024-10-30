// types/Card.ts
export type Card = {
  id: string;
  value: number;
  type: 'main' | 'side';
  isPlayable: boolean;
};
