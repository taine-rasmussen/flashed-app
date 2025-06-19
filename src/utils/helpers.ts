import { fontGrades, vScaleGrades } from './ClimbingGrades';

import { GradeStyle } from '@/types';

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const gradeColors: Record<string, string> = {
  V0: '#A8E6CF',
  V1: '#DCEDC2',
  V2: '#FFD3B6',
  V3: '#FFAAA5',
  V4: '#FF8C94',
  V5: '#FF6F69',
  V6: '#E27D60',
  V7: '#C38D9E',
  V8: '#41B3A3',
  V9: '#E8A87C',
  V10: '#C38D9E',
  V11: '#6B5B95',
  V12: '#355C7D',
  V13: '#6A6572',
  V14: '#9A8F97',
  V15: '#B5838D',
  V16: '#E5989B',
  V17: '#FFCAD4',
};

export function getGradeColor(grade: string): string {
  const normalized = grade.toUpperCase().replace(/\+$/, '');
  return gradeColors[normalized] ?? '#CCCCCC';
}

export const getUsersGrades = (grade: GradeStyle) => {
  switch (grade) {
    case 'VScale':
      return vScaleGrades;
    case 'Font':
      return fontGrades;
    default:
      vScaleGrades;
  }
};
