import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

type AppInputProps = TextInputProps & {
  containerStyle?: ViewStyle;
};

const AppInput: React.FC<AppInputProps> = ({
  containerStyle,
  style,
  mode = 'outlined',
  ...props
}) => {
  return (
    <TextInput
      mode={mode}
      style={[styles.input, containerStyle, style]}
      {...props}
      theme={{ roundness: 8 }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    borderRadius: 24,
  },
});

export default AppInput;
