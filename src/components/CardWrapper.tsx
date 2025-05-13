import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React from 'react';

interface ICardWrapper {
  children: React.ReactNode;
}

const CardWrapper = (props: ICardWrapper) => {
  return (
    <Card style={styles.container}>
      <Card.Content>{props.children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
  },
});

export default CardWrapper;
