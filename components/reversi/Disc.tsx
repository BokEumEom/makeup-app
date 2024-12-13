import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';

type DiscProps = {
  type: 'black' | 'white';
  cellSize: number;
};

const Disc: React.FC<DiscProps> = ({ type, cellSize }) => {
  const discSize = cellSize * 0.8;
  const isBlack = type === 'black';

  return (
    <Animated.View
      entering={BounceIn}
      exiting={BounceOut}
      style={{
        width: discSize,
        height: discSize,
        borderRadius: discSize / 2,
        elevation: 6,
      }}
    >
      <LinearGradient
        colors={isBlack ? ['#0D0D0D', '#333333'] : ['#F5F5F5', '#DDDDDD']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.disc,
          { width: discSize, height: discSize, borderRadius: discSize / 2 },
        ]}
      />
      {/* Outer highlight for a 3D effect */}
      <LinearGradient
        colors={isBlack ? ['#000', '#222'] : ['#FFF', '#CCC']}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.discHighlight,
          { width: discSize * 0.9, height: discSize * 0.9, borderRadius: (discSize * 0.9) / 2 },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  disc: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  discHighlight: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    elevation: 2,
  },
});

export default Disc;
