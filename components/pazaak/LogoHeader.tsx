// components/pazaak/LogoHeader.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const LogoHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={require('@/assets/images/spread-cards.png')} style={styles.cardImage} />
      <Text style={styles.logo}>PAZAAK</Text>
      <Text style={styles.subLogo}>ONLINE</Text>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  cardImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  logo: {
    fontSize: 40,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
  subLogo: {
    fontSize: 16,
    color: '#FFD700',
    fontFamily: 'DepartureMono',
    letterSpacing: 2,
  },
});
