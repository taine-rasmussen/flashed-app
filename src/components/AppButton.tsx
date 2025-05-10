import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

type AppButtonProps = ButtonProps & {
  containerStyle?: ViewStyle;
};

const AppButton: React.FC<AppButtonProps> = ({ containerStyle, style, ...props }) => {
  return (
    <Button
      style={[styles.button, containerStyle, style]}
      contentStyle={styles.content}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    borderRadius: 8,
  },
  content: {
    height: 48,
  },
});

export default AppButton;
