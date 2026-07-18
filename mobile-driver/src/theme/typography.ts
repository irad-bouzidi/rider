import { TextStyle } from 'react-native';
export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 30 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 26 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  bodyBold: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
  caption: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  captionBold: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  smallBold: { fontSize: 12, fontWeight: '600', lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
  buttonSmall: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  input: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  tabLabel: { fontSize: 10, fontWeight: '500', lineHeight: 14 },
};
