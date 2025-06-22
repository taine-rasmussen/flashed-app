import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

type AppInputProps = TextInputProps & {
  containerStyle?: ViewStyle;
  labelAbove?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const AppInput: React.FC<AppInputProps> = ({
  containerStyle,
  style,
  mode = 'outlined',
  labelAbove,
  leftIcon,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      {labelAbove && <Text style={styles.label}>{labelAbove}</Text>}
      <TextInput
        mode={mode}
        style={[styles.input, style]}
        theme={{ roundness: 8 }}
        left={leftIcon ? <TextInput.Icon icon={() => leftIcon} /> : undefined}
        right={props.rightIcon ? <TextInput.Icon icon={() => props.rightIcon} /> : undefined}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 24,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
});

export default AppInput;
