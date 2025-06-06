export interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}
