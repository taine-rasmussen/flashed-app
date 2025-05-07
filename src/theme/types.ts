import { lightTheme } from './Light';
import { darkTheme } from './Dark';

export type AppTheme = typeof lightTheme & typeof darkTheme;
