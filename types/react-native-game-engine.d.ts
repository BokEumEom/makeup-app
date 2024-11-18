// types/react-native-game-engine.d.ts
declare module 'react-native-game-engine' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  export interface GameEngineProps {
    systems?: any[];
    entities?: any;
    running?: boolean;
    onEvent?: (event: any) => void;
    style?: ViewStyle;
  }

  export default class GameEngine extends Component<GameEngineProps> {}
}
