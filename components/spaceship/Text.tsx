// Text 컴포넌트 (react-native 기본 Text 사용)
import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  h2?: boolean;
  h2Style?: object;
}

const Text: React.FC<CustomTextProps> = ({ h2 = false, h2Style = {}, style, children, ...rest }) => {
  return (
    <RNText
      style={[
        { fontFamily: 'orbitron' },
        h2 && styles.h2,
        h2 && h2Style,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Text;
export { Text };
