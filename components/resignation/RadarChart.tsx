import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Circle, Polygon, Text as SvgText, Line } from 'react-native-svg';

type RadarChartProps = {
  data: { labels: string[]; values: number[] }; // 데이터: 라벨과 값
  maxValue: number; // 최대 값
};

const RadarChart: React.FC<RadarChartProps> = ({ data, maxValue }) => {
  const { labels, values } = data;
  const chartSize = Dimensions.get('window').width - 60;
  const radius = chartSize / 2;
  const angleSlice = (2 * Math.PI) / labels.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const x = radius + radius * (value / maxValue) * Math.cos(angle);
    const y = radius + radius * (value / maxValue) * Math.sin(angle);
    return { x, y };
  };

  const points = values
    .map((value, index) => {
      const { x, y } = getCoordinates(value, index);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>카테고리별 강점과 약점</Text>
      <Svg width={chartSize} height={chartSize}>
        {/* Draw Grid */}
        {[...Array(5)].map((_, i) => {
          const radiusStep = (radius / 5) * (i + 1);
          return (
            <Circle
              key={`grid-${i}`}
              cx={radius}
              cy={radius}
              r={radiusStep}
              stroke="#e0e0e0"
              strokeWidth="1"
              fill="none"
            />
          );
        })}

        {/* Draw Spokes */}
        {labels.map((_, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const x = radius + radius * Math.cos(angle);
          const y = radius + radius * Math.sin(angle);
          return (
            <Line
              key={`line-${i}`}
              x1={radius}
              y1={radius}
              x2={x}
              y2={y}
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <Polygon
          points={points}
          fill="rgba(63, 81, 181, 0.3)"
          stroke="rgba(63, 81, 181, 1)"
          strokeWidth="2"
        />

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const x = radius + (radius + 20) * Math.cos(angle);
          const y = radius + (radius + 20) * Math.sin(angle);
          return (
            <SvgText
              key={`label-${i}`}
              x={x}
              y={y}
              fontSize="12"
              fill="#333"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});

export default RadarChart;
