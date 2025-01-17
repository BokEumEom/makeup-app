import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { LucideProps } from "lucide-react-native";
import CustomText from "@/components/common/CustomText";

type DashboardCardProps = {
  title: string;
  subtitle: string;
  icon: React.FC<LucideProps>;
  colors: [string, string];
  link: string | { pathname: string; params?: Record<string, string> };
  iconColor?: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  colors,
  link,
  iconColor = "#FFFFFF",
}) => {
  // `link`를 올바른 `href` 형태로 변환
  const href =
    typeof link === "string"
      ? link // 문자열로 전달
      : {
          pathname: link.pathname,
          query: link.params || {}, // params를 query로 전달
        };

  return (
    <Link
      href={href as any} // 타입을 강제로 맞춤
      asChild
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        accessibilityLabel={`${title} 카드`}
        accessibilityHint={`${subtitle} 링크로 이동합니다.`}
      >
        <LinearGradient
          colors={colors}
          style={styles.cardBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Icon size={40} color={iconColor} />
          </View>
          <View style={styles.textContainer}>
            <CustomText style={styles.cardTitle}>{title}</CustomText>
            <CustomText style={styles.cardSubtitle}>{subtitle}</CustomText>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Link>
  );
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = CARD_WIDTH * 0.68;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 5,
  },
  cardBackground: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  textContainer: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});

export default DashboardCard;
