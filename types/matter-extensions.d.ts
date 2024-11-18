// types/matter-extensions.d.ts
import Matter from 'matter-js';

declare module 'matter-js' {
  interface Body {
    trajectory?: number;
    tilt?: number;
  }
}
