import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/common/CustomText';

type DashboardCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: [string, string];
  link: string | { pathname: string; params?: Record<string, string> };
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtitle, icon, colors, link }) => (
  <Link href={link} asChild>
    <TouchableOpacity style={styles.card}>
      <LinearGradient colors={colors} style={styles.cardBackground}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <View style={styles.cardContent}>
          <CustomText style={styles.cardTitle}>{title}</CustomText>
          <CustomText style={styles.cardSubtitle}>{subtitle}</CustomText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  card: {
    width: '48%', // Flex-based width for consistent grid spacing
    aspectRatio: 1.2,
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardBackground: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default DashboardCard;
