import React, { PureComponent } from 'react';
import { StatusBar, Dimensions, AppState } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import randomInt from 'random-int';
import { Accelerometer } from 'expo-sensors';
import GameOver from '../../../components/spaceship/game-over';
import {
  Rocket,
  Floor,
  Star,
  Satellite,
  Planet,
  UFO,
} from '../../../components/spaceship/renderers';
import { Tilt, Physics, Trajectory } from '../../../utils/spaceshipSystems';
import Score from '../../../components/spaceship/score';
import styles from './game-styles';

const STAR_COUNT = 20;
const INIT_COMPLEXITY = 3;
const { width, height } = Dimensions.get('window');
let COUNTER = 1;

class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.lastFrameTime = null;
  }

  componentDidMount() {
    this.subscribeToAccelerometer();
    this.incrementScore();
    this.appStateListener = AppState.addEventListener(
      'change',
      this.handleAppStateChange
    );
    this.startEngineUpdateLoop();
  }

  componentWillUnmount() {
    this.unsubscribeFromAccelerometer();
    this.appStateListener?.remove();
    cancelAnimationFrame(this.rafId);
    clearTimeout(this.scoreTimer);
  }

  componentDidUpdate(prevProps, prevState) {
    const { complexity } = this.state;
    if (
      complexity !== prevState.complexity &&
      complexity !== INIT_COMPLEXITY
    ) {
      this.addNewObstacle();
    }
  }

  getInitialState = () => ({
    complexity: INIT_COMPLEXITY,
    score: 0,
    entities: this.createEntities(),
    showOverlay: false,
    appState: 'active',
  });

  createEntities = () => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const { world } = engine;

    const rocket = Matter.Bodies.rectangle(
      width / 2,
      height - 200,
      25,
      50,
      {
        isStatic: true,
        label: 'rocket',
      }
    );
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height,
      width + 100,
      10,
      {
        isStatic: true,
        isSensor: true,
        label: 'floor',
      }
    );

    const { obstacles, bodies } = this.createObstacles();
    const { stars, starsInWorld } = this.createStars();

    this.setupCollisionHandler(engine);
    Matter.World.add(world, [rocket, floor, ...bodies, ...starsInWorld]);

    return {
      physics: { engine, world },
      ...stars,
      ...obstacles,
      rocket: { body: rocket, size: [50, 100], renderer: Rocket },
      floor: { body: floor, size: [width + 100, 5], renderer: Floor },
    };
  };

  createStars = () => {
    const stars = {};
    for (let i = 1; i <= STAR_COUNT; i++) {
      const size = randomInt(10, 20);
      stars[`star_${i}`] = {
        body: Matter.Bodies.rectangle(
          randomInt(1, width - 10),
          randomInt(0, height),
          size,
          size,
          {
            frictionAir: 0.1,
            isSensor: true,
            label: 'star',
          }
        ),
        opacity: randomInt(1, 5) / 10,
        size: [size, size],
        renderer: Star,
      };
    }
    const starsInWorld = Object.values(stars).map((star) => star.body);
    return { stars, starsInWorld };
  };

  createObstacles = () => {
    const obstacles = {};
    const bodies = [];
    for (let i = 0; i < 3; i++) {
      const { obstacle, body } = this.generateObstacle();
      obstacles[`obstacle_${COUNTER}`] = obstacle;
      bodies.push(body);
      COUNTER += 1;
    }
    return { obstacles, bodies };
  };

  generateObstacle = () => {
    const options = [this.getSatellite, this.getPlanet, this.getUFO];
    const choice = randomInt(0, options.length - 1);
    return options[choice]();
  };

  getSatellite = () => {
    const body = Matter.Bodies.rectangle(
      randomInt(1, width - 50),
      randomInt(0, -200),
      75,
      45,
      {
        frictionAir: 0.05,
        label: 'obstacle',
        trajectory: randomInt(-5, 5) / 10,
      }
    );
    const obstacle = { body, size: [75, 50], renderer: Satellite };
    return { obstacle, body };
  };

  getPlanet = () => {
    const body = Matter.Bodies.rectangle(
      randomInt(1, width - 50),
      randomInt(0, -200),
      60,
      35,
      {
        frictionAir: 0.05,
        label: 'obstacle',
        trajectory: randomInt(-5, 5) / 10,
      }
    );
    const obstacle = { body, size: [75, 50], renderer: Planet };
    return { obstacle, body };
  };

  getUFO = () => {
    const body = Matter.Bodies.rectangle(
      randomInt(1, width - 50),
      randomInt(0, -200),
      50,
      20,
      {
        frictionAir: 0.05,
        label: 'obstacle',
        trajectory: randomInt(-5, 5) / 10,
      }
    );
    const obstacle = { body, size: [50, 20], renderer: UFO };
    return { obstacle, body };
  };

  setupCollisionHandler = (engine) => {
    Matter.Events.on(engine, 'collisionStart', (event) => {
      const { pairs } = event;
      const objA = pairs[0].bodyA.label;
      const objB = pairs[0].bodyB.label;

      if (objA === 'floor' && objB === 'star') {
        Matter.Body.setPosition(pairs[0].bodyB, {
          x: randomInt(1, width - 10),
          y: 0,
        });
      }

      if (objA === 'floor' && objB === 'obstacle') {
        Matter.Body.set(pairs[0].bodyB, {
          trajectory: randomInt(-5, 5) / 10,
        });
        Matter.Body.setPosition(pairs[0].bodyB, {
          x: randomInt(1, width - 30),
          y: randomInt(0, -100),
        });
      }

      if (objA === 'rocket' && objB === 'obstacle') {
        this.setState({ showOverlay: true });
      }
    });
  };

  subscribeToAccelerometer = () => {
    this._subscription = Accelerometer.addListener(({ x }) => {
      const { rocket } = this.state.entities;
      if (rocket?.body) {
        Matter.Body.set(rocket.body, { tilt: x });
      }
    });
  };

  unsubscribeFromAccelerometer = () => {
    this._subscription?.remove();
    this._subscription = null;
  };

  startEngineUpdateLoop = () => {
    this.rafId = requestAnimationFrame(this.updateEngine);
  };

  updateEngine = (time) => {
    const { engine } = this.state.entities.physics;
    if (!this.lastFrameTime) {
      this.lastFrameTime = time;
    }
    const delta = time - this.lastFrameTime;
    this.lastFrameTime = time;

    const correctedDelta = Math.min(delta, 16.667);

    Matter.Engine.update(engine, correctedDelta);

    this.rafId = requestAnimationFrame(this.updateEngine);
  };

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  };

  incrementScore = () => {
    const { showOverlay, appState } = this.state;
    if (!showOverlay && appState === 'active') {
      this.setState(
        (prevState) => {
          const newScore = prevState.score + 1;
          const increase = Math.floor(newScore / 50);
          const complexity = increase < 3 ? 3 : increase;
          return { score: newScore, complexity };
        },
        () => {
          this.scoreTimer = setTimeout(this.incrementScore, 100);
        }
      );
    } else {
      clearTimeout(this.scoreTimer);
    }
  };

  addNewObstacle = () => {
    const { world } = this.state.entities.physics;
    const { obstacle, body } = this.generateObstacle();

    Matter.World.add(world, body);
    const updatedEntities = {
      ...this.state.entities,
      [`obstacle_${COUNTER}`]: obstacle,
    };
    COUNTER += 1;
    this.setState({ entities: updatedEntities }, () => {
      this.refs.engine.swap(updatedEntities);
    });
  };

  reloadApp = () => {
    const { engine } = this.state.entities.physics;
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);
    Matter.Events.off(engine, 'collisionStart');
    COUNTER = 1;

    this.setState(this.getInitialState(), () => {
      this.refs.engine.swap(this.state.entities);
      this.incrementScore();
    });
  };

  render() {
    const { showOverlay, entities, score, appState } = this.state;
    return (
      <GameEngine
        style={styles.container}
        ref="engine"
        systems={[Physics, Tilt, Trajectory]}
        entities={entities}
        running={appState === 'active'}
      >
        <Score score={score} />
        <StatusBar hidden />
        <GameOver
          showOverlay={showOverlay}
          score={score}
          reloadApp={this.reloadApp}
        />
      </GameEngine>
    );
  }
}

export default Game;
