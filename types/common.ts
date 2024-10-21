import { ReactNode } from 'react';

// 기본 컴포넌트 props 타입
export interface BaseComponentProps {
  children?: ReactNode;
  style?: object;
}

// 색상 타입
export type Color = string;

// 크기 타입
export type Size = 'small' | 'medium' | 'large';

// 방향 타입
export type Direction = 'horizontal' | 'vertical';

// 정렬 타입
export type Alignment = 'start' | 'center' | 'end' | 'stretch';

// 마진 및 패딩 타입
export interface Spacing {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

// 아이콘 타입
export interface IconProps {
  name: string;
  size?: number;
  color?: Color;
}

// 버튼 타입
export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// 입력 필드 타입
export interface InputProps extends BaseComponentProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

// 에러 타입
export interface AppError {
  message: string;
  code?: string;
}

// 사용자 타입
export interface User {
  id: string;
  name: string;
  email: string;
  // 추가 필요한 사용자 정보
}

// 날짜 범위 타입
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: AppError;
}

// 테마 타입
export interface Theme {
  primaryColor: Color;
  secondaryColor: Color;
  backgroundColor: Color;
  textColor: Color;
  // 추가 필요한 테마 속성
}

// 환경 설정 타입
export interface AppSettings {
  language: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  // 추가 필요한 설정 옵션
}

