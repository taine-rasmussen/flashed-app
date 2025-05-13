import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';

interface CardWrapperProps extends Omit<React.ComponentProps<typeof Card>, 'elevation'> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, style, ...rest }) => {
  return (
    <Card style={[styles.container, style]} {...rest}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
  },
});

CardWrapper.displayName = 'CardWrapper';

export default CardWrapper;
