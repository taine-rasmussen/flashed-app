import { DateType } from 'react-native-ui-datepicker';

export interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

export interface User {
  auth_provider: string;
  created_at: string;
  email: string;
  first_name: string;
  grade_style: GradeStyle;
  home_gym: string;
  id: number;
  last_name: string;
  location: string;
  notifications_enabled: boolean;
  onboarding_complete: boolean;
  profile_image_url: string | null;
  username: string | null;
}

export interface Climb {
  id: number;
  user_id: number;
  attempts: number;
  created_at: Date;
  grade: string;
}

export type FilterOrder = 'asc' | 'desc';

export interface IDateRange {
  startDate: DateType;
  endDate: DateType;
}

export type GradeStyle = 'VScale' | 'Font';

export interface IStagedClimb {
  grade: string[];
  attempts: string;
  date: DateType;
  homeGym: string;
}

export type SettingsScreen = 'main' | 'editProfile' | 'changePassword' | 'gradeStyle';
