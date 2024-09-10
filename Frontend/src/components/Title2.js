import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Title2({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
